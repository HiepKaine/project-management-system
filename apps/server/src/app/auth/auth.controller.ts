import { UserActivityManagerService } from './../user-activity-manager/user-activity-manager.service';
import { pick } from 'lodash';

import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  NotFoundException,
  Post,
  Headers,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ApiObjectResponse,
  ApiResponseService,
  ApiSuccessResponse,
  HashService,
} from '@server/common';
import { environment } from '@server/env/environment';

import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserStatus } from './entity/user.entity';
import { PasswordResetService } from './password-reset.service';
import { SystemNotificationService } from '../systemNotification/systemNotification.service';
import { NotificationType } from '../systemNotification/systemNotification.entity';
import { MailManagerService } from '../mail-manager/mail-manager.service';
import { RealIP } from 'nestjs-real-ip';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private hashService: HashService,
    private response: ApiResponseService,
    private jwtService: JwtService,
    private passwordResetService: PasswordResetService,
    private systemNotificationService: SystemNotificationService,
    private mailManagerService: MailManagerService,
    private userActivityManagerService: UserActivityManagerService
  ) {}

  @Post('/login')
  @ApiResponse({ status: 201, description: 'Logged In' })
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  @ApiUnauthorizedResponse()
  async login(
    @Body() data: LoginDto,
    @RealIP() ip: string,
    @Headers() headers
  ): Promise<ApiObjectResponse<{ token: string }>> {
    const usernameLowerCase = data.user.toLowerCase();

    const user = await this.authService.findUser({
      where: {
        email: usernameLowerCase,
      },
      select: ['id', 'email', 'username', 'password', 'status', 'loginFailed'],
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('Tài khoản hoặc mật khẩu không đúng');
    }

    if (
      environment.enableLoginFailedCheck &&
      user.loginFailed > environment.maxLoginFailed
    ) {
      throw new ForbiddenException(
        'Tài khoản của bạn đã bị khóa do đăng nhập sai quá nhiều, vui lòng liên hệ để được mở khóa tài khoản'
      );
    }

    const isValidPassword = this.hashService.check(
      data.password,
      user.password
    );

    if (!isValidPassword) {
      await this.authService.increaseLoginFailed(user.id);
      throw new BadRequestException('Tài khoản hoặc mật khẩu không đúng');
    }

    if (!user.status) {
      throw new ForbiddenException(
        'Tài khoản của bạn đã bị khóa, vui lòng liên hệ để được mở khóa tài khoản'
      );
    }

    // const isValidActivity = await this.userActivityManagerService.checkValidActivityAndSaveIp(user.id, ip, headers);

    // if (!isValidActivity && user.isRole('user')) {
    //   throw new ForbiddenException('Tài khoản của bạn đã bị khóa do truy cập trên quá nhiều thiết bị, vui lòng liên hệ để được mở khóa tài khoản');
    // }

    await this.authService.resetLoginFailed(user.id);

    return this.response.object({
      token: this.jwtService.sign(
        pick(user, ['id', 'email', 'username', 'status', 'verified'])
      ),
    });
  }

  @Post('/register')
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  @ApiConflictResponse({ description: 'Email already exist' })
  async register(
    @Body() data: RegisterDto
  ): Promise<ApiObjectResponse<{ token: string }>> {
    const emailLowerCase = data.email.toLowerCase();

    if (await this.authService.isExist(emailLowerCase)) {
      throw new ConflictException('Người dùng đã tồn tại');
    }
    const code = await this.authService.generateNewUserCode();
    const user = await this.authService.create({
      password: this.hashService.hash(data.password),
      email: emailLowerCase,
      code,
      status: UserStatus.active,
    });
    await this.authService.attachDefaultRole(user);

    const message = `${emailLowerCase} đã đăng ký`;
    await this.systemNotificationService.createSystemNotification(
      NotificationType.UserRegister,
      message
    );

    try {
      await this.mailManagerService.create({
        to: user.email,
        subject: 'Đăng kí tài khoản thành công',
        title: 'Chúc mừng bạn đã đăng kí tài khoản thành công',
        greeting: `Xin chào ${user.email}`,
        content:
          'Bạn đã đăng kí tài khoản thành công. Bây giờ bạn đã có thể tham gia học và thi thử ở các khoá học miễn phí.',
      });
    } catch (error) {
      console.log(error);
    }

    return this.response.object({
      token: this.jwtService.sign(
        pick(user, ['id', 'email', 'username', 'status', 'verified'])
      ),
    });
  }

  @Post('forgot-password')
  @ApiOkResponse({ description: 'Email sent' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async sendResetLinkEmail(
    @Body() data: ForgotPasswordDto
  ): Promise<ApiSuccessResponse> {
    const user = await this.authService.firstOrFail({
      where: { email: data.email.toLowerCase() },
    });

    await this.passwordResetService.expireAllToken(user.email);

    const token = await this.jwtService.sign(pick(user, ['id', 'email']), {
      expiresIn: 5 * 60 * 1000,
    });

    await this.passwordResetService.generate(user.email, token);

    return this.response.success();
  }

  @Post('reset-password')
  @ApiOkResponse({ description: 'Email sent' })
  @ApiBadRequestResponse({ description: 'Token is expired' })
  async reset(
    @Body() data: ResetPasswordDto
  ): Promise<ApiObjectResponse<{ token: string }>> {
    const { token, password } = data;
    const passwordReset = await this.passwordResetService.firstOrFail({
      where: { token },
    });

    if (this.passwordResetService.isExpired(passwordReset)) {
      throw new BadRequestException('Token is expired');
    }
    await this.passwordResetService.expire(token);
    const user = await this.authService.first({
      where: { email: passwordReset.user },
    });

    await this.authService.changePassword(user.id, password);

    return this.response.object({
      token: this.jwtService.sign(
        pick(user, ['id', 'email', 'username', 'status', 'verified'])
      ),
    });
  }
}
