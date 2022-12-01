import { Test, TestingModule } from '@nestjs/testing';
import { TestSessionAnswerService } from './test-session-answer.service';

describe('TestSessionAnswerService', () => {
  let service: TestSessionAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestSessionAnswerService],
    }).compile();

    service = module.get<TestSessionAnswerService>(TestSessionAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
