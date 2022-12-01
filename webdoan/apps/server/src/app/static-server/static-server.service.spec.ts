import { Test, TestingModule } from '@nestjs/testing';
import { StaticServerService } from './static-server.service';

describe('StaticServerService', () => {
  let service: StaticServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaticServerService],
    }).compile();

    service = module.get<StaticServerService>(StaticServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
