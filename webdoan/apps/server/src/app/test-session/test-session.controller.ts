import { Brackets } from 'typeorm';
import { BadRequestException, Body, ConflictException, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCollectionResponse, ApiItemResponse, ApiObjectResponse, ApiResponseService, ApiSuccessResponse, Auth, AuthenticatedUser, JwtAuthGuard } from '@server/common';
import { Roles } from '../auth/entity/role.entity';
import { User } from '../auth/entity/user.entity';
import { ExamCodeService } from '../exam/service/exam-code/exam-code.service';
import { ExamPackExamService } from '../exam/service/exam-pack-exam/exam-pack-exam.service';
import { ExamService } from '../exam/service/exam/exam.service';
import { TestSessionAnswerService } from '../test-session-answer/test-session-answer.service';
import { FindManyQueryParam, FindManyQueryParamWithCategory } from './../@core/types';
import { TestSession, TestSessionStatus } from './test-session.entity';
import { TestSessionService } from './test-session.service';
import { TestSessionTransformer } from './test-session.transformer';
import { CreateTestSessionAnswerDto, CreateTestSessionDto } from './types';

@Controller('api/test-session')
@ApiTags('test-session')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TestSessionController {
  constructor(
    private response: ApiResponseService,
    private testSessionService: TestSessionService,
    private examCodeService: ExamCodeService,
    private testSessionAnswerService: TestSessionAnswerService,
    private examService: ExamService,
    private examPackExamService: ExamPackExamService
  ) { }

  @Get('time')
  async getCurrentTimeInServer(): Promise<ApiObjectResponse<{ time: string }>> {
    return this.response.object({ time: new Date().toISOString() })
  }

  @Post()
  async createTestSession(@AuthenticatedUser() user: User, @Body() data: CreateTestSessionDto): Promise<ApiItemResponse<TestSession>> {
    if (!(await this.examPackExamService.isExist(data.examId, data.examPackId))) {
      throw new BadRequestException('Bài thi không tồn tại');
    }
    const examCode = await this.examCodeService.createExamCode(data.examId);
    const testSession = await this.testSessionService.create({
      examPackId: data.examPackId,
      examId: data.examId,
      userId: user.id,
      examCodeId: examCode.id,
      status: TestSessionStatus.process,
      startTime: new Date()
    });

    return this.response.item(testSession, TestSessionTransformer);
  }

  @Post(":testSessionId/answer")
  async testSessionAnswer(@Param('testSessionId', ParseIntPipe) testSessionId: number, @Body() data: CreateTestSessionAnswerDto): Promise<ApiSuccessResponse> {
    const testSession = await this.testSessionService.find(testSessionId);
    if (!testSession) {
      throw new BadRequestException("Không tồn tại bài thi")
    }

    const exam = await this.examService.find(testSession.examId);
    if (!exam) {
      throw new BadRequestException("Đề thi không tồn tại")
    }

    const isFinished = testSession.isFinished(exam.duration);
    if (isFinished) {
      throw new ConflictException("Quá thời gian làm bài")
    }

    const questionId = data.questionId
    const answerId = data.answerId

    if (await this.testSessionAnswerService.isExist(testSessionId, questionId)) {
      const testSessionAnswer = await this.testSessionAnswerService.repository.createQueryBuilder()
        .where("questionId = :questionId AND testSessionId = :testSessionId", { questionId, testSessionId })
        .getOne();

      await this.testSessionAnswerService.update(testSessionAnswer.id, {
        testSessionId: testSessionId,
        questionId: questionId,
        answerId: answerId
      })
    } else {
      await this.testSessionAnswerService.create({
        testSessionId: testSessionId,
        questionId: questionId,
        answerId: answerId
      })
    }

    return this.response.success()
  }

  @Post(":testSessionId/complete")
  async completeTestSession(@Param('testSessionId', ParseIntPipe) testSessionId: number): Promise<ApiItemResponse<TestSession>> {
    const testSession = await this.testSessionService.repository.createQueryBuilder('testSession')
      .leftJoinAndSelect('testSession.examCode', 'examCode')
      .leftJoinAndSelect('examCode.questions', 'question')
      .leftJoinAndSelect('question.answers', 'answer')
      .where('testSession.id = :testSessionId', { testSessionId })
      .getOne();

    if (!testSession) {
      throw new BadRequestException("Bài thi không tồn tại")
    }

    const testSessionAnswer = await this.testSessionAnswerService.repository.createQueryBuilder()
      .where('testSessionId = :testSessionId', { testSessionId: testSession.id })
      .getMany();

    let correct = 0, incorrect = 0;
    const totalQuestion = testSession.examCode.questions.length;

    for (let i = 0; i < totalQuestion; i++) {
      const question = testSession.examCode.questions[i];
      const userAnswer = testSessionAnswer.find(i => i.questionId === question.id);
      if (userAnswer) {
        const correctAnswer = question.answers.find(item => item.isCorrect);
        if (correctAnswer && correctAnswer.id === userAnswer.answerId) {
          correct++;
        } else {
          incorrect++;
        }
      }
    }

    const score = Math.round(correct / totalQuestion * 100) / 100;
    const skip = totalQuestion - (correct + incorrect);
    const data = {
      score,
      correctQuestion: correct,
      inCorrectQuestion: incorrect,
      skipQuestion: skip,
      status: TestSessionStatus.complete,
      completedAt: new Date().toISOString()
    };
    console.log({ data });
    const result = await this.testSessionService.update(testSessionId, data);
    return this.response.item(result, TestSessionTransformer);
  }

  @Get()
  @Auth('admin')
  async index(@Query() param: FindManyQueryParamWithCategory): Promise<ApiCollectionResponse<TestSession>> {
    const page = param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit = param.limit && Number(param.limit) > 0 ? Math.floor(Number(param.limit)) : 20;
    const query = await this.testSessionService.repository.createQueryBuilder('testSession')
      .leftJoinAndSelect('testSession.user', 'user')
      .leftJoinAndSelect('testSession.examCode', 'examCode')
      .leftJoinAndSelect('examCode.exam', 'exam')
      .orderBy('testSession.id', 'DESC')
    if (param.keyword) {
      query.andWhere(new Brackets(sqb => {
        const searchPattern = `%${param.keyword}%`;
        sqb.where('user.email LIKE :searchPattern', { searchPattern })
        sqb.orWhere('user.phoneNumber LIKE :searchPattern', { searchPattern })
      }))
    }
    if (param.categoryId) {
      query.andWhere(new Brackets(sqb => {
        sqb.where('exam.categoryId = :categoryId', { categoryId: param.categoryId })
      }))
    }
    const result = await this.testSessionService.paginate(query, { limit, page })
    return this.response.paginate(result, TestSessionTransformer)
  }

  @Delete(':testSessionId')
  @Auth('admin')
  async destroy(@Param('testSessionId', ParseIntPipe) testSessionId: number): Promise<ApiSuccessResponse> {
    await this.testSessionService.findOrFail(testSessionId);
    await this.testSessionService.destroy(testSessionId);
    return this.response.success();
  }

  @Get('my-test-session')
  async userGetAllTestSession(@AuthenticatedUser() authenticatedUser: User, @Query() param: FindManyQueryParam): Promise<ApiCollectionResponse<TestSession>> {
    const page = param.page && Number(param.page) > 0 ? Number(param.page) : 1;
    const query = this.testSessionService.repository.createQueryBuilder('testSession')
      .leftJoinAndSelect('testSession.examCode', 'examCode')
      .leftJoinAndSelect('examCode.exam', 'exam')
      .where('testSession.userId = :userId', { userId: authenticatedUser.id })
      .orderBy('testSession.id', 'DESC');
    const result = await this.testSessionService.paginate(query, { page, limit: 20 })
    return this.response.paginate(result, TestSessionTransformer)
  }

  @Get(':testSessionId')
  @Auth('admin', 'user')
  async show(@AuthenticatedUser() user: User, @Param('testSessionId', ParseIntPipe) testSessionId: number): Promise<ApiItemResponse<TestSession>> {
    console.log(user.id, testSessionId);
    if (user.isRole(Roles.user) && !(await this.testSessionService.isExist(user.id, testSessionId))) {
      throw new ConflictException("Chưa có lượt làm bài nào ")
    }
    const result = await this.testSessionService.repository.createQueryBuilder('testSession')
      .leftJoinAndSelect('testSession.user', 'user')
      .leftJoinAndSelect('testSession.examCode', 'examCode')
      .leftJoinAndSelect('testSession.testSessionAnswers', 'testSessionAnswer')
      .leftJoinAndSelect('examCode.questions', 'question')
      .leftJoinAndSelect('examCode.exam', 'exam')
      .leftJoinAndSelect('question.answers', 'answer')
      .leftJoinAndSelect('question.readingContent', 'readingContent')
      .where('testSession.id = :testSessionId', { testSessionId })
      .getOne();

    return this.response.item(result, TestSessionTransformer)
  }
}

