import { Test, TestingModule } from '@nestjs/testing';
import { StaticServerController } from './static-server.controller';

describe('StaticServerController', () => {
  let controller: StaticServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaticServerController],
    }).compile();

    controller = module.get<StaticServerController>(StaticServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
