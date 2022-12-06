import { Test, TestingModule } from '@nestjs/testing';
import { ReadingContentService } from './reading-content.service';

describe('ReadingContentService', () => {
  let service: ReadingContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadingContentService],
    }).compile();

    service = module.get<ReadingContentService>(ReadingContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
