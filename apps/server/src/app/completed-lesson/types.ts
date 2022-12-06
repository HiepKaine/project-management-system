import {
  IsNumber,
  IsOptional,
  IsString, MaxLength
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindFaqQueryParam {
  @ApiProperty({ required: false })
  @IsOptional()
  keyword: string;

  @ApiProperty({ required: false })
  @IsOptional()
  page: number;
}

export class CreateCompletedLessonDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  courseChapterId: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  lessonId: number;

}

export class UpdateCompletedLessonDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  courseChapterId: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  lessonId: number;

}

