import { Test, TestingModule } from '@nestjs/testing';
import { UserActivityManagerService } from './user-activity-manager.service';

describe('UserActivityManagerService', () => {
  let service: UserActivityManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserActivityManagerService],
    }).compile();

    service = module.get<UserActivityManagerService>(
      UserActivityManagerService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
