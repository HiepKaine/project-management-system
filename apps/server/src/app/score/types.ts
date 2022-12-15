import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class createScoreDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  score: number;

  @ApiProperty()
  studentId: number;

  @ApiProperty()
  subjectId: number;
}

export class updateScoreDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  score: number;

  @ApiProperty()
  studentId: number;

  @ApiProperty()
  subjectId: number;
}
