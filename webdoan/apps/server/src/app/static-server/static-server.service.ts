import { ExamPack } from '../exam-pack/exam-pack.entity';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Course } from '../course/course.entity';
import { SeoParam } from './types';

@Injectable()
export class StaticServerService {
  constructor(
    private connection: Connection,
  ) { }

  async getPage(originalUrl: string): Promise<{ view: string, param: SeoParam }> {
    const param: SeoParam = {
      title: 'Công chức 24/7',
      description: 'Hệ thống cung cấp các khóa ôn thi Công chức, Viên chức. Với bề dày kinh nghiệm và thành tích đã đạt được. Chúng tôi sẽ mang đến khóa học chất  lượng hàng đầu Việt Nam.'
    };

    const coursePagePattern = new RegExp('^/khoa-hoc/([0-9]+)(.*)$');
    const examPackPagePattern = new RegExp('^/de-thi/([0-9]+)(.*)$');
    if (coursePagePattern.test(originalUrl)) {
      const courseId = Number(originalUrl.match(coursePagePattern)[1]);
      const course = await this.connection.getRepository(Course).findOneOrFail(courseId);
      param.title = course.name;
    } else if (examPackPagePattern.test(originalUrl)) {
      const examPackId = Number(originalUrl.match(examPackPagePattern)[1]);
      const examPack = await this.connection.getRepository(ExamPack).findOneOrFail(examPackId);
      param.title = examPack.name;
    }
    return { view: 'index', param }
  }
}
