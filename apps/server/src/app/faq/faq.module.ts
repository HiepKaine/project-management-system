import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';

@Module({
  imports: [
    SharedCommonModule
  ],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule { }
