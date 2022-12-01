import { BadRequestException, Body, ConflictException, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiItemResponse, ApiObjectResponse, ApiPaginateResponse, ApiResponseService, ApiSuccessResponse, Auth, AuthenticatedUser, HashService, JwtAuthGuard } from '@server/common';
import { pick } from 'lodash';
import { Brackets } from 'typeorm';
import { FindManyQueryParam } from '../@core/types';
import { AuthService } from '../auth/auth.service';
import { Roles } from '../auth/entity/role.entity';
import { User, UserStatus } from '../auth/entity/user.entity';
import { UserTransformer } from '../auth/transformer/user.transformer';
import { Course, CourseStatus } from '../course/course.entity';
import { CourseService } from '../course/course.service';
import { CourseTransformer } from '../course/course.transformer';
import { ExamPack } from '../exam-pack/exam-pack.entity';
import { ExamPackService } from '../exam-pack/exam-pack.service';
import { ExamPackTransformer } from '../exam-pack/exam-pack.transformer';
import { NotificationType } from '../systemNotification/systemNotification.entity';
import { SystemNotificationService } from '../systemNotification/systemNotification.service';
import { AddFreeCourseDto, AddFreeExamPackDto, AddUserCourseDto, AddUserExamPackDto, AdminChangePasswordDto, AdminCreateAccountDto, UpdateUserDto, UserChangePasswordDto } from './types';
import { UserService } from './user.service';
import { UserCourseService } from './userCourse.service';
import { UserExamPackService } from './userExamPack.service';

@Controller('api/user')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private response: ApiResponseService,
    private systemNotificationService: SystemNotificationService,
    private authService: AuthService,
    private hashService: HashService,
    private userService: UserService,
    private userCourseService: UserCourseService,
    private userExamPackService: UserExamPackService,
    private courseService: CourseService,
    private examPackService: ExamPackService
  ) { }

  @Get()
  @Auth('admin')
  @ApiOperation({ summary: 'Danh sách người dùng (không bao gồm admin)' })
  async index(@Query() params: FindManyQueryParam): Promise<ApiPaginateResponse<User>> {
    const page = params.page && Number(params.page) > 0 ? Math.floor(Number(params.page)) : 1;
    const limit = params.limit && Number(params.limit) > 0 ? Math.floor(Number(params.limit)) : 20;
    let query = this.userService.repository.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .orderBy('user.id', 'DESC')
      .where('role.slug = :role', { role: Roles.user });

    if (params.keyword) {
      const searchString = `%${params.keyword}%`
      query = query.andWhere(new Brackets(sqb => {
        sqb.where('user.email LIKE :searchString', { searchString })
          .orWhere('user.phoneNumber LIKE :searchString', { searchString })
          .orWhere('user.username LIKE :searchString', { searchString })
          .orWhere('user.firstName LIKE :searchString', { searchString })
          .orWhere('user.lastName LIKE :searchString', { searchString })
      }))
    }

    const result = await this.userService.paginate(query, { page, limit });

    return this.response.paginate(result, UserTransformer);
  }


  @Delete(':id')
  @Auth('admin')
  async deleteUser(@Param('id', ParseIntPipe) userId: number): Promise<ApiSuccessResponse> {
    await this.userService.destroy(userId);
    return this.response.success();
  }

  @Put('/change-password')
  async userResetPassword(@AuthenticatedUser() user: User, @Body() data: UserChangePasswordDto): Promise<ApiItemResponse<User>> {
    const userId = user.id
    const result = await this.userService.update(userId, { password: this.hashService.hash(data.password) });
    return this.response.item(result, UserTransformer)
  }

  @Put(':id')
  @Auth('admin')
  async update(@Param('id', ParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto): Promise<ApiItemResponse<User>> {
    const result = await this.userService.update(userId, pick(updateUserDto, ['email', 'firstName', 'lastName', 'phoneNumber', 'image', 'organization', 'position']));
    return this.response.item(result, UserTransformer);
  }

  @Get('/:userId/course')
  @Auth('admin')
  async getUserCourse(@Param('userId', ParseIntPipe) userId: number): Promise<ApiPaginateResponse<Course>> {
    const query = this.courseService.repository.createQueryBuilder('course')
      .leftJoinAndSelect('course.userCourses', 'userCourse')
      .where("userCourse.userId = :userId", { userId })

    const result = await this.courseService.paginate(query);
    return this.response.paginate(result, CourseTransformer)
  }

  @Get('/:userId/exam-pack')
  @Auth('admin')
  async getUserExamPack(@Param('userId', ParseIntPipe) userId: number): Promise<ApiPaginateResponse<ExamPack>> {
    const query = this.examPackService.repository.createQueryBuilder('examPack')
      .leftJoinAndSelect('examPack.userExamPacks', 'userExamPack')
      .where("userExamPack.userId = :userId", { userId })

    const result = await this.examPackService.paginate(query)
    return this.response.paginate(result, ExamPackTransformer)
  }

  @Get('my-course')
  @Auth('user')
  async getMyCousre(@AuthenticatedUser() user: User): Promise<ApiPaginateResponse<Course>> {
    const userId = user.id
    const query = this.courseService.repository.createQueryBuilder('course')
      .leftJoinAndSelect('course.courseChapters', 'courseChapter')
      .leftJoinAndSelect('courseChapter.lessons', 'lesson')
      .leftJoinAndSelect('course.userCourses', 'userCourse')
      .where("userCourse.userId = :userId", { userId })
      .andWhere('course.status = :status', { status: CourseStatus.active })

    const result = await this.courseService.paginate(query)
    return this.response.paginate(result, CourseTransformer)
  }

  @Post('my-course')
  @Auth('user')
  async addFreeCourse(@AuthenticatedUser() authenticatedUser: User, @Body() data: AddFreeCourseDto): Promise<ApiItemResponse<Course>> {
    const course = await this.courseService.findOrFail(data.courseId);
    if (!course.isFreeCourse) {
      throw new BadRequestException('Không thêm được khoá học có phí');
    }
    if (await this.userCourseService.isExist(authenticatedUser.id, data.courseId)) {
      throw new BadRequestException('Bạn đã thêm khoá học này trước đó');
    }
    await this.userCourseService.create({ userId: authenticatedUser.id, courseId: data.courseId });
    return this.response.item(course, CourseTransformer);
  }

  @Get('my-exam-pack')
  @Auth('user')
  async getMyExamPack(@AuthenticatedUser() user: User): Promise<ApiPaginateResponse<ExamPack>> {
    const userId = user.id
    const query = this.examPackService.repository.createQueryBuilder('examPack')
      .leftJoinAndSelect('examPack.userExamPacks', 'userExamPack')
      .where("userExamPack.userId = :userId", { userId })

    const result = await this.examPackService.paginate(query)
    return this.response.paginate(result, ExamPackTransformer)
  }

  @Post('my-exam-pack')
  @Auth('user')
  async addFreeExamPack(@AuthenticatedUser() authenticatedUser: User, @Body() data: AddFreeExamPackDto): Promise<ApiItemResponse<ExamPack>> {
    const examPack = await this.examPackService.findOrFail(data.examPackId);
    if (!examPack.isFree) {
      throw new BadRequestException('Không thêm được gói trắc nghiệm có phí');
    }
    if (await this.userExamPackService.isExist(authenticatedUser.id, data.examPackId)) {
      throw new BadRequestException('Bạn đã thêm gói trắc nghiệm này trước đó');
    }
    await this.userExamPackService.create({ userId: authenticatedUser.id, examPackId: data.examPackId });
    return this.response.item(examPack, ExamPackTransformer);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết người dùng (không bao gồm admin)' })
  @Auth('admin')
  async show(@Param('id', ParseIntPipe) userId: number): Promise<ApiItemResponse<User>> {
    const result = await this.userService.repository.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.id = :userId', { userId })
      .andWhere('role.slug = :role', { role: Roles.user })
      .getOne()
    if (!result) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    return this.response.item(result, UserTransformer);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  @Auth('admin')
  async createAccount(@Body() data: AdminCreateAccountDto): Promise<ApiObjectResponse<User>> {

    const emailLowerCase = data.email.toLowerCase();

    if (await this.authService.isExist(emailLowerCase)) {
      throw new ConflictException('Người dùng đã tồn tại');
    }

    const code = await this.authService.generateNewUserCode();
    const user = await this.authService.create({
      password: this.hashService.hash(data.password),
      code,
      email: emailLowerCase,
      image: data.image,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      position: data.position,
      organization: data.organization,
      status: UserStatus.active,
    });
    await this.authService.attachDefaultRole(user);

    const message = `Đã tạo tài khoản cho học viên ${emailLowerCase}`
    await this.systemNotificationService.createSystemNotification(NotificationType.UserRegister, message)

    return this.response.object(user)
  }

  @Put('/:userId/password')
  @Auth('admin')
  async adminResetPassword(@Param('userId', ParseIntPipe) userId: number, @Body() data: AdminChangePasswordDto): Promise<ApiItemResponse<User>> {
    const result = await this.userService.update(userId, { password: this.hashService.hash(data.password) });
    return this.response.item(result, UserTransformer)
  }

  @Put('/:userId/status')
  @Auth('admin')
  async adminChangeUserStatus(@Param('userId', ParseIntPipe) userId: number, @Body('status', ParseBoolPipe) status: boolean): Promise<ApiItemResponse<User>> {
    const result = await this.userService.update(userId, { status, loginFailed: 0 });
    return this.response.item(result, UserTransformer)
  }

  @Post('/:userId/course')
  @Auth('admin')
  async addCourse(@Param('userId', ParseIntPipe) userId: number, @Body() data: AddUserCourseDto): Promise<ApiSuccessResponse> {
    if (await this.userCourseService.isExist(userId, data.courseId)) {
      throw new ConflictException('Khóa học đã được thêm trước đó');
    }

    await this.userCourseService.create({ userId: userId, courseId: data.courseId })
    return this.response.success()
  }

  @Post('/:userId/exam-pack')
  @Auth('admin')
  async addExamPack(@Param('userId', ParseIntPipe) userId: number, @Body() data: AddUserExamPackDto): Promise<ApiSuccessResponse> {
    if (await this.userExamPackService.isExist(userId, data.examPackId)) {
      throw new ConflictException('Gói câu hỏi đã được thêm trước đó');
    }

    await this.userExamPackService.create({ userId: userId, examPackId: data.examPackId })
    return this.response.success()
  }

  @Get('/:userId/course/:courseId/check')
  @Auth('admin')
  async checkCourseAdded(@Param('userId', ParseIntPipe) userId: number, @Param('courseId', ParseIntPipe) courseId: number): Promise<ApiObjectResponse<{ exist: boolean }>> {
    const exist = await this.userCourseService.repository
      .createQueryBuilder()
      .where("userId = :userId AND courseId = :courseId", { userId, courseId })
      .getCount() > 0

    return this.response.object({ exist: exist })
  }

  @Get('/:userId/exam-pack/:examPackId/check')
  @Auth('admin')
  async checkExamPackAdded(@Param('userId', ParseIntPipe) userId: number, @Param('examPackId', ParseIntPipe) examPackId: number): Promise<ApiObjectResponse<{ exist: boolean }>> {
    const exist = await this.userExamPackService.repository
      .createQueryBuilder()
      .where("userId = :userId AND examPackId = :examPackId", { userId, examPackId })
      .getCount() > 0

    return this.response.object({ exist: exist })
  }

  @Get('/my-course/:courseId/check')
  @Auth('admin', 'user')
  async checkCourseAddedByUser(@AuthenticatedUser() user: User, @Param('courseId', ParseIntPipe) courseId: number): Promise<ApiObjectResponse<{ exist: boolean }>> {
    if (user.isRole('admin')) {
      return this.response.object({ exist: true })
    } else {
      const userId = user.id
      const exist = await this.userCourseService.repository
        .createQueryBuilder()
        .where("userId = :userId AND courseId = :courseId", { userId, courseId })
        .getCount() > 0

      return this.response.object({ exist: exist })
    }
  }

  @Get('/my-exam-pack/:examPackId/check')
  @Auth('user')
  async checkExamPackAddedByUser(@AuthenticatedUser() user: User, @Param('examPackId', ParseIntPipe) examPackId: number): Promise<ApiObjectResponse<{ exist: boolean }>> {
    const userId = user.id

    const exist = await this.userExamPackService.repository
      .createQueryBuilder()
      .where("userId = :userId AND examPackId = :examPackId", { userId, examPackId })
      .getCount() > 0

    return this.response.object({ exist: exist })
  }

  @Delete('/:userId/course/:courseId')
  @Auth('admin')
  async deleteCourse(@Param('userId', ParseIntPipe) userId: number, @Param('courseId', ParseIntPipe) courseId: number): Promise<ApiSuccessResponse> {
    if (!await this.userCourseService.isExist(userId, courseId)) {
      throw new ConflictException('Khóa học chưa được thêm với người dùng này');
    }

    await this.userCourseService.repository.createQueryBuilder()
      .delete()
      .where("userId = :userId AND courseId = :courseId", { userId, courseId })
      .execute()

    return this.response.success()
  }

  @Delete('/:userId/exam-pack/:examPackId')
  @Auth('admin')
  async deleteExamPack(@Param('userId', ParseIntPipe) userId: number, @Param('examPackId', ParseIntPipe) examPackId: number): Promise<ApiSuccessResponse> {
    if (!await this.userExamPackService.isExist(userId, examPackId)) {
      throw new ConflictException('Gói câu hỏi chưa được thêm với người dùng này');
    }

    await this.userExamPackService.repository.createQueryBuilder()
      .delete()
      .where("userId = :userId AND examPackId = :examPackId", { userId, examPackId })
      .execute()

    return this.response.success()
  }

}
