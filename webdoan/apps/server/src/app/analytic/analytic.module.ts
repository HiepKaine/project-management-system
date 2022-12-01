import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { AnalyticController } from './analytic.controller';
import { AnalyticService } from './analytic.service';

@Module({
  imports: [
    SharedCommonModule
  ],
  controllers: [AnalyticController],
  providers: [AnalyticService],
})
export class AnalyticModule { }
