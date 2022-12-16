import { Module } from '@nestjs/common';
import { DivisionService } from './division.service';
import { DivisionController } from './division.controller';
import { SharedCommonModule } from '@server/common';

@Module({
  imports: [SharedCommonModule],
  providers: [DivisionService],
  controllers: [DivisionController],
})
export class DivisionModule {}
