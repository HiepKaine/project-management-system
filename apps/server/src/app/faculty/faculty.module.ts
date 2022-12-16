import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { SharedCommonModule } from '@server/common';

@Module({
  providers: [FacultyService],
  imports: [SharedCommonModule],
  controllers: [FacultyController],
})
export class FacultyModule {}
