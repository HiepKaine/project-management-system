import { Test, TestingModule } from '@nestjs/testing';
import { ExamCodeQuestionService } from './exam-code-question.service';

describe('ExamCodeQuestionService', () => {
  let service: ExamCodeQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamCodeQuestionService],
    }).compile();

    service = module.get<ExamCodeQuestionService>(ExamCodeQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
