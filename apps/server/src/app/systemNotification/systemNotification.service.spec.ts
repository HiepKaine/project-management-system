import { Test, TestingModule } from '@nestjs/testing';
import { SystemNotificationService } from './systemNotification.service';

describe('NotificationService', () => {
  let service: SystemNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemNotificationService],
    }).compile();

    service = module.get<SystemNotificationService>(SystemNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
