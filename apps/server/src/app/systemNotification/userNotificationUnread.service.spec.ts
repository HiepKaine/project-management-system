import { Test, TestingModule } from '@nestjs/testing';
import { UserNotificationUnreadService } from './userNotificationUnread.service';

describe('UserNotificationUnreadService', () => {
  let service: UserNotificationUnreadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserNotificationUnreadService],
    }).compile();

    service = module.get<UserNotificationUnreadService>(
      UserNotificationUnreadService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
