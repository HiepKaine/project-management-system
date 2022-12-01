import { Test, TestingModule } from '@nestjs/testing';
import { SystemNotificationController } from './systemNotification.controller';

describe('SystemNotificationController', () => {
  let controller: SystemNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemNotificationController],
    }).compile();

    controller = module.get<SystemNotificationController>(
      SystemNotificationController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
