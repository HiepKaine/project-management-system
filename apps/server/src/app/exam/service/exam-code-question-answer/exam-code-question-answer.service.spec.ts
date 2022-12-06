import { Test, TestingModule } from '@nestjs/testing';
import { ExamCodeQuestionAnswerService } from './exam-code-question-answer.service';

describe('ExamCodeQuestionAnswerService', () => {
  let service: ExamCodeQuestionAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamCodeQuestionAnswerService],
    }).compile();

    service = module.get<ExamCodeQuestionAnswerService>(
      ExamCodeQuestionAnswerService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
