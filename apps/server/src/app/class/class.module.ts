import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [SharedCommonModule],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
