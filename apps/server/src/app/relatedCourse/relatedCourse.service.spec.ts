import { Test, TestingModule } from '@nestjs/testing';
import { RelatedCourseService } from './relatedCourse.service';

describe('RelatedCourseService', () => {
  let service: RelatedCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelatedCourseService],
    }).compile();

    service = module.get<RelatedCourseService>(RelatedCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
