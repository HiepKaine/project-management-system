import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';

@Module({
  imports: [
    SharedCommonModule,
  ],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
