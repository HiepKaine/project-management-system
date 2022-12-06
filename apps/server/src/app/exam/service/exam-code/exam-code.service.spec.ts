import { Test, TestingModule } from '@nestjs/testing';
import { ExamCodeService } from './exam-code.service';

describe('ExamCodeService', () => {
  let service: ExamCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamCodeService],
    }).compile();

    service = module.get<ExamCodeService>(ExamCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
