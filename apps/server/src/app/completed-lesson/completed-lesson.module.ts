import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { CompletedLessonController } from './completed-lesson.controller';
import { CompletedLessonService } from './completed-lesson.service';

@Module({
  imports: [
    SharedCommonModule
  ],
  controllers: [CompletedLessonController],
  providers: [CompletedLessonService],
})
export class CompletedLessonModule { }
