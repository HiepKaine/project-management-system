import { BadRequestException, Controller, Get, ParseArrayPipe, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiObjectResponse, ApiResponseService, Auth, JwtAuthGuard } from '@server/common';
import * as moment from 'moment-timezone';
import { User } from '../auth/entity/user.entity';
import { Course } from '../course/course.entity';
import { Question } from '../exam/question.entity';
import { UserCourse } from '../user/userCourse.entity';
import { AnalyticService } from './analytic.service';
import { GetUserReportQueryParam } from './types';
@Controller('api/analytic')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Analytic')
export class AnalyticController {
  constructor(
    private response: ApiResponseService,
    private analyticService: AnalyticService
  ) { }

  @Get('report')
  @Auth('admin')
  async getReport(): Promise<ApiObjectResponse<{ userCount: number, courseCount: number, questionCount: number }>> {
    const userCount = await this.analyticService.getObjectCount(User);
    const courseCount = await this.analyticService.getObjectCount(Course);
    const questionCount = await this.analyticService.getObjectCount(Question);
    return this.response.object({ userCount, courseCount, questionCount })
  }

  @Get('report/user')
  @Auth('admin')
  async getUserReportByTimeSeri(@Query() query: GetUserReportQueryParam): Promise<ApiObjectResponse<Array<{ label: string, value: number }>>> {
    const allowedTypes = ['week', 'month', 'year'];
    if (!allowedTypes.includes(query.type)) {
      throw new BadRequestException('Chỉ hỗ trợ type là week hoặc month');
    }
    const result: Array<{ label: string, value: number }> = [];
    if (query.type === 'week') {
      const from = moment(query.from).tz('Asia/Ho_Chi_Minh');
      const startOfWeek = from.startOf('W');
      for (let i = 0; i < 7; i++) {
        const d = startOfWeek.clone().add(i, 'days');
        result.push({
          label: d.format('YYYY-MM-DD'), value: await this.analyticService.getObjectCount(User, {
            relations: ['roles'],
            where: (sqb) => {
              sqb.where(`DATE(User.createdAt) = "${d.format('YYYY-MM-DD')}"`)
                .andWhere('User__roles.slug = :slug', { slug: 'user' });
            }
          })
        })
      }
    } else if (query.type === 'month') {
      const from = moment(query.from).tz('Asia/Ho_Chi_Minh');
      const startOfMonth = from.startOf('M');
      const daysInMonth = startOfMonth.daysInMonth();
      for (let i = 0; i < daysInMonth; i++) {
        const d = startOfMonth.clone().add(i, 'days');
        result.push({
          label: d.format('YYYY-MM-DD'), value: await this.analyticService.getObjectCount(User, {
            relations: ['roles'],
            where: (sqb) => {
              sqb.where(`DATE(User.createdAt) = "${d.format('YYYY-MM-DD')}"`)
                .andWhere('User__roles.slug = :slug', { slug: 'user' });
            }
          })
        })
      }
    } else {
      const from = moment(query.from).tz('Asia/Ho_Chi_Minh');
      const startOfYear = from.startOf('y');
      for (let i = 0; i < 12; i++) {
        const d = startOfYear.clone().add(i, 'months');
        result.push({
          label: d.format('YYYY-MM-DD'), value: await this.analyticService.getObjectCount(User, {
            relations: ['roles'],
            where: (sqb) => {
              sqb.where(`MONTH(User.createdAt) = "${d.month() + 1}"`)
                .andWhere(`YEAR(User.createdAt) = "${d.year()}"`)
                .andWhere('User__roles.slug = :slug', { slug: 'user' });
            }
          })
        })
      }
    }
    return this.response.object(result);
  }

  @Get('course/user-count')
  @Auth('admin')
  async getUserCount(@Query('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[]): Promise<ApiObjectResponse<Array<{ courseId: number, userCount: number }>>> {
    const result: Array<{ courseId: number, userCount: number }> = [];
    for (const courseId of ids) {
      const userCount = await this.analyticService.getObjectCount<UserCourse>(UserCourse, { where: { courseId } });
      result.push({ courseId, userCount });
    }
    return this.response.object(result);
  }
}
