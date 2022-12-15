import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SharedCommonModule } from '@server/common';

@Module({
  providers: [StudentService],
  imports: [SharedCommonModule],
  controllers: [StudentController],
})
export class StudentModule {}
