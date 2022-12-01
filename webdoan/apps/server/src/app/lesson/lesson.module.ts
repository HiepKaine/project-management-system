import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  imports: [
    SharedCommonModule,
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
