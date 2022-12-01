import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [SharedCommonModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule { }
