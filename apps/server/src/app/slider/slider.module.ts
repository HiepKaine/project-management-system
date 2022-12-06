import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { SharedCommonModule } from '@server/common';

@Module({
  imports: [
    SharedCommonModule,
  ],
  providers: [SliderService],
  controllers: [SliderController],
})
export class SliderModule {}
