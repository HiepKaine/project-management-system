import { Test, TestingModule } from '@nestjs/testing';
import { CourseChapterLessonService } from './course-chapter-lesson.service';

describe('CourseChapterLessonService', () => {
  let service: CourseChapterLessonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseChapterLessonService],
    }).compile();

    service = module.get<CourseChapterLessonService>(
      CourseChapterLessonService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
