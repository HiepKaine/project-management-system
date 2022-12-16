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

@Controller('user')
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
    const result = await this.userService.update(userId, pick(updateUserDto, ['email', 'phoneNumber']));
    return this.response.item(result, UserTransformer);
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
      phoneNumber: data.phoneNumber,
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

}
