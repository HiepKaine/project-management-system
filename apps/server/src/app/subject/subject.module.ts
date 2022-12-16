import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

@Module({
  imports: [SharedCommonModule],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
