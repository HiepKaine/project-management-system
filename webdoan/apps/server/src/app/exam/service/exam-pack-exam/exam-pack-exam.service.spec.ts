import { Test, TestingModule } from '@nestjs/testing';
import { ExamPackExamService } from './exam-pack-exam.service';

describe('ExamPackExamService', () => {
  let service: ExamPackExamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamPackExamService],
    }).compile();

    service = module.get<ExamPackExamService>(ExamPackExamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
