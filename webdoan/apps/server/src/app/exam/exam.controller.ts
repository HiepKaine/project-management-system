import { FindManyQueryParamWithCategory } from './../@core/types';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth
} from '@server/common';
import { pick } from 'lodash';
import { ExamCode } from './exam-code.entity';
import { ExamCodeTransformer } from './exam-code.transformer';
import { Exam } from './exam.entity';
import { ExamTransformer } from './exam.transformer';
import { Question } from './question.entity';
import { QuestionTransformer } from './question.transformer';
import { ReadingContent } from './reading-content.entity';
import { ReadingContentTransformer } from './reading-content.transformer';
import { ExamCodeService } from './service/exam-code/exam-code.service';
import { ExamQuestionService } from './service/exam-question/exam-question.service';
import { ExamService } from './service/exam/exam.service';
import { QuestionService } from './service/question/question.service';
import { ReadingContentService } from './service/reading-content/reading-content.service';
import {
  AddQuestionByCategoryParam,
  AddQuestionDto,
  CreateExamDto,
  CreateQuestionDto,
  CreateReadingContent,
  GetAllQuestionQueryParam,
  ImportQuestionDto,
  UpdateQuestionDto,
  UpdateReadingContent
} from './types';
import { isBoolean } from 'lodash';

@Controller('api/exam')
@ApiTags('exam')
@ApiBearerAuth()
export class ExamController {
  constructor(
    private response: ApiResponseService,
    private questionService: QuestionService,
    private examService: ExamService,
    private examQuestionService: ExamQuestionService,
    private examCodeService: ExamCodeService,
    private readingContentService: ReadingContentService,
  ) { }

  @Get('reading-content')
  @Auth('admin')
  async getReadingContent(@Query() param: FindManyQueryParamWithCategory): Promise<ApiPaginateResponse<Question>> {
    const page = param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit = param.limit && Number(param.limit) > 0 ? Math.floor(Number(param.limit)) : 20;
    let query = this.readingContentService.repository.createQueryBuilder('readingContent')
      .leftJoinAndSelect('readingContent.questions', 'question')
      .leftJoinAndSelect('question.answers', 'answer');
    if (param.keyword) {
      query = query.andWhere(`readingContent.title LIKE "%${param.keyword}%"`)
    }
    if (param.categoryId) {
      query = query.andWhere('readingContent.categoryId = :categoryId', { categoryId: param.categoryId })
    }
    const result = await this.readingContentService.paginate(query, { page, limit })
    return this.response.paginate(result, QuestionTransformer);
  }

  @Get('reading-content/:id')
  @Auth('admin')
  async getReadingContentItem(@Param('id', ParseIntPipe) readingContentId: number): Promise<ApiItemResponse<ReadingContent>> {
    const result = await this.readingContentService.repository.createQueryBuilder('readingContent')
      .leftJoinAndSelect('readingContent.questions', 'question')
      .leftJoinAndSelect('question.answers', 'answer')
      .where('readingContent.id = :id', { id: readingContentId })
      .getOneOrFail();
    return this.response.item(result, ReadingContentTransformer);
  }

  @Post('reading-content')
  @Auth('admin')
  async createReadingContent(@Body() data: CreateReadingContent): Promise<ApiItemResponse<ReadingContent>> {
    const result = await this.readingContentService.create(data);
    return this.response.item(result, ReadingContentTransformer);
  }

  @Put('reading-content/:id')
  @Auth('admin')
  async updateReadingContentItem(@Param('id', ParseIntPipe) readingContentId: number, @Body() data: UpdateReadingContent): Promise<ApiItemResponse<ReadingContent>> {
    const result = await this.readingContentService.update(readingContentId, data);
    return this.response.item(result, ReadingContentTransformer);
  }

  @Delete('reading-content/:id')
  @Auth('admin')
  async removeReadingContentItem(@Param('id', ParseIntPipe) readingContentId: number): Promise<ApiSuccessResponse> {
    await this.readingContentService.removeReadingContentItem(readingContentId);
    return this.response.success()
  }

  @Delete(':examId/reading-content/:readingContentId')
  @Auth('admin')
  async removeReadingContentQuestion(@Param('examId', ParseIntPipe) examId: number, @Param('readingContentId', ParseIntPipe) readingContentId: number): Promise<ApiSuccessResponse> {
    await this.readingContentService.removeReadingContentQuestion(examId, readingContentId)
    return this.response.success()
  }

  @Get('question')
  @Auth('admin')
  async getAllQuestion(@Query() param: GetAllQuestionQueryParam): Promise<ApiPaginateResponse<Question>> {
    const page = param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit = param.limit && Number(param.limit) > 0 ? Math.floor(Number(param.limit)) : 20;
    let query = this.questionService.repository.createQueryBuilder('question')
      .leftJoinAndSelect('question.category', 'category')
      .leftJoinAndSelect('question.answers', 'answer')
      .leftJoinAndSelect('question.readingContent', 'readingContent');

    if (isBoolean(param.hasReadingContent)) {
      if (param.hasReadingContent) {
        query.andWhere('question.readingContentId IS NOT NULL')
      } else {
        query.andWhere('question.readingContentId IS NULL')
      }
    }

    if (param.keyword) {
      query = query.andWhere(`question.question LIKE "%${param.keyword}%"`)
    }

    if (param.categoryId) {
      query = query.andWhere('question.categoryId = :categoryId', { categoryId: param.categoryId })
    }

    const result = await this.questionService.paginate(query, { page, limit })
    return this.response.paginate(result, QuestionTransformer);
  }

  @Get('question/:questionId')
  async showQuestion(@Param('questionId', ParseIntPipe) questionId: number): Promise<ApiItemResponse<Question>> {
    const result = await this.questionService.findOrFail(questionId, { relations: ['answers'] });
    return this.response.item(result, QuestionTransformer);
  }

  @Post('question')
  @Auth('admin')
  async createQuestion(@Body() data: CreateQuestionDto): Promise<ApiItemResponse<Question>> {
    const correctAnswers = data.answers.filter(item => item.isCorrect);
    if (!Array.isArray(correctAnswers) || correctAnswers.length === 0 || correctAnswers.length > 1) {
      throw new BadRequestException('Phải có một đáp án đúng được chọn');
    }
    const result = await this.questionService.createQuestion(data);
    return this.response.item(result, QuestionTransformer);
  }

  @Post('question/import')
  @Auth('admin')
  async importQuestion(@Body() data: ImportQuestionDto): Promise<ApiSuccessResponse> {
    await this.questionService.importQuestion(data.path);
    return this.response.success();
  }

  @Put('question/:questionId')
  @Auth('admin')
  async updateQuestion(@Param('questionId', ParseIntPipe) questionId: number, @Body() data: UpdateQuestionDto): Promise<ApiItemResponse<Question>> {
    const correctAnswers = data.answers.filter(item => item.isCorrect);
    if (!Array.isArray(correctAnswers) || correctAnswers.length === 0 || correctAnswers.length > 1) {
      throw new BadRequestException('Phải có một đáp án đúng được chọn');
    }
    const result = await this.questionService.updateQuestion(questionId, data);
    return this.response.item(result, QuestionTransformer);
  }

  @Delete('question/:questionId')
  @Auth('admin')
  async deleteQuestion(@Param('questionId', ParseIntPipe) questionId: number): Promise<ApiSuccessResponse> {
    await this.questionService.destroy(questionId);
    return this.response.success();
  }

  @Post(':examId/question')
  @Auth('admin')
  async addExamQuestion(@Param('examId', ParseIntPipe) examId: number, @Body() dto: AddQuestionDto): Promise<ApiSuccessResponse> {

    if (dto.questionIds) {
      for (const qId of dto.questionIds) {
        if (await this.examQuestionService.isExamQuestionExist(examId, qId)) {
          throw new BadRequestException('Câu hỏi đã được thêm vào đề thi trước đó');
        }
        await this.examQuestionService.addExamQuestion(examId, qId);
      }
    } else {
      if (await this.examQuestionService.isExamQuestionExist(examId, dto.questionId)) {
        throw new BadRequestException('Câu hỏi đã được thêm vào đề thi trước đó');
      }
      await this.examQuestionService.addExamQuestion(examId, dto.questionId);
    }
    return this.response.success();
  }

  @Post(':examId/add-question-by-category')
  @Auth('admin')
  async addExamQuestionByCategory(@Param('examId', ParseIntPipe) examId: number, @Body() dto: AddQuestionByCategoryParam): Promise<ApiSuccessResponse> {
    const exam = await this.examService.findOrFail(examId);
    const questions = await this.questionService.getRamdomQuestion(dto.categoryIds, dto.questionCount);
    for (const question of questions) {
      const isQuestionInExam = await this.examQuestionService.isExamQuestionExist(exam.id, question.id);
      if (!isQuestionInExam) await this.examQuestionService.addExamQuestion(exam.id, question.id);
    }
    return this.response.success();
  }

  @Delete(':examId/question/:questionId')
  @Auth('admin')
  async removeExamQuestion(@Param('examId', ParseIntPipe) examId: number, @Param('questionId', ParseIntPipe) questionId: number): Promise<ApiSuccessResponse> {
    await this.examQuestionService.removeExamQuestion(examId, questionId);
    return this.response.success();
  }


  @Get()
  @Auth('admin')
  async index(@Query() params: FindManyQueryParamWithCategory): Promise<ApiPaginateResponse<Exam>> {
    const page = params.page && Number(params.page) > 0 ? Math.floor(Number(params.page)) : 1;
    const limit = params.limit && Number(params.limit) > 0 ? Math.floor(Number(params.limit)) : 20;
    let query = await this.examService.repository.createQueryBuilder('exam')
      .leftJoinAndSelect('exam.questions', 'question')
      .orderBy('exam.id', 'DESC');
    if (params.keyword) {
      query = query.where(`exam.name LIKE "%${params.keyword}%"`);
    }
    if (params.categoryId) {
      query = query.where('exam.categoryId = :categoryId', { categoryId: params.categoryId });
    }
    const result = await this.examService.paginate(query, { page, limit });
    return this.response.paginate(result, ExamTransformer)
  }

  @Get(':examId')
  async getOneExam(@Param('examId', ParseIntPipe) examId: number): Promise<ApiItemResponse<Exam>> {
    const result = await this.examService.repository.createQueryBuilder('exam')
      .leftJoinAndSelect('exam.questions', 'question')
      .leftJoinAndSelect('question.readingContent', 'readingContent')
      .where('exam.id = :examId', { examId })
      .getOne();
    return this.response.item(result, ExamTransformer)
  }

  @Post()
  @Auth('admin')
  async createExam(@Body() data: CreateExamDto): Promise<ApiItemResponse<Exam>> {
    if (await this.examService.isExist(data.name)) {
      throw new ConflictException("Tên đề thi đã tồn tại.")
    }
    const result = await this.examService.create(pick(data, ['name', 'duration', 'retry', 'referencePoint']))
    return this.response.item(result, ExamTransformer)
  }

  @Put(':examId')
  @Auth('admin')
  async updateExam(@Body() data: CreateExamDto, @Param('examId', ParseIntPipe) examId: number): Promise<ApiItemResponse<Exam>> {
    const result = await this.examService.update(examId, data)
    return this.response.item(result, ExamTransformer)
  }

  @Delete(':examId')
  @Auth('admin')
  async deleteOneExam(@Param('examId', ParseIntPipe) examId: number): Promise<ApiSuccessResponse> {
    await this.examService.destroy(examId)
    return this.response.success()
  }

  @Post(':examId/exam-code')
  async createExamCode(@Param('examId', ParseIntPipe) examId: number): Promise<ApiItemResponse<ExamCode>> {
    const examCode = await this.examCodeService.createExamCode(examId);
    return this.response.item(examCode, ExamCodeTransformer);
  }

  @Get(':examId/exam-code/:examCodeId')
  async getExamCode(@Param('examId', ParseIntPipe) examId: number, @Param('examCodeId', ParseIntPipe) examCodeId: number): Promise<ApiItemResponse<ExamCode>> {
    const result = await this.examCodeService.getExamCode(examCodeId);
    return this.response.item(result, ExamCodeTransformer);
  }

}
