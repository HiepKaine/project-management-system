import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class createSubjectDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  subjectCode: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  subjectName: string;
}

export class updateSubjectDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  subjectName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  subjectCode: string;
}
