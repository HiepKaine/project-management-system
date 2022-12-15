import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';

@Module({
  imports: [SharedCommonModule],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
