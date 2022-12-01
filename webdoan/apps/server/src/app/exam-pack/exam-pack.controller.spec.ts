import { Test, TestingModule } from '@nestjs/testing';
import { ExamPackController } from './exam-pack.controller';

describe('ExamPackController', () => {
  let controller: ExamPackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamPackController],
    }).compile();

    controller = module.get<ExamPackController>(
      ExamPackController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
