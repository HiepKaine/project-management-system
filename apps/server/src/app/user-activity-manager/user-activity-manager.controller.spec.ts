import { Test, TestingModule } from '@nestjs/testing';
import { UserActivityManagerController } from './user-activity-manager.controller';

describe('UserActivityManagerController', () => {
  let controller: UserActivityManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserActivityManagerController],
    }).compile();

    controller = module.get<UserActivityManagerController>(
      UserActivityManagerController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
