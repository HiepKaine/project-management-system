import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { SharedCommonModule } from '@server/common';

@Module({
  imports: [SharedCommonModule],
  providers: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule {}
