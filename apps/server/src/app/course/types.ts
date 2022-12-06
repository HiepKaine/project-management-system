import { FindManyQueryParam } from '../@core/types';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetActiveCourseQueryParam extends FindManyQueryParam {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  type: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  isFree: number;
}

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  lecturer: string;

  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  image: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  video: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  isFreeCourse: boolean;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  originalPrice: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  type: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  status: number;
}

export class UpdateCourseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  lecturer: string;

  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @MaxLength(255)
  image: string;

  @ApiProperty()
  video: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsBoolean()
  isFreeCourse: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  originalPrice: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  type: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  status: number;
}

export class AddCourseChapterDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;
}

export class AddLessonForChapterDto {
  @ApiProperty()
  lessonId: number;
}

export class AddHighlightExamPackDto {
  @ApiProperty()
  examPackId: number;
}
