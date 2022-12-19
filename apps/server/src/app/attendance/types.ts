import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class createAttendanceDto {
  @ApiProperty()
  studentId: number;

  @ApiProperty()
  subjectId: number;

  @ApiProperty()
  totalAbsences: number;
}

export class updateAttendanceDto {
  @ApiProperty()
  studentId: number;

  @ApiProperty()
  subjectId: number;

  @ApiProperty()
  totalAbsences: number;
}
