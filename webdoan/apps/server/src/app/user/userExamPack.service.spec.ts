import { Test, TestingModule } from '@nestjs/testing';
import { UserExamPackService } from './userExamPack.service'
describe('UserExamPackService', () => {
  let service: UserExamPackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExamPackService],
    }).compile();

    service = module.get<UserExamPackService>(UserExamPackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
