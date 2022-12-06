import { Test, TestingModule } from '@nestjs/testing';
import { ExamPackService } from './exam-pack.service';

describe('ExamPackService', () => {
  let service: ExamPackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamPackService],
    }).compile();

    service = module.get<ExamPackService>(ExamPackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
