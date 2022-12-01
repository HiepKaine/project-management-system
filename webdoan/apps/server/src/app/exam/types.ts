import {
  IsBoolean, IsNumber,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { FindManyQueryParam } from '../@core/types';

export class GetAllQuestionQueryParam extends FindManyQueryParam {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  categoryId!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  hasReadingContent!: boolean;
}

export class AddQuestionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  questionIds: number[];

  @ApiProperty({ required: false })
  @IsOptional()
  questionId: number;
}

export class AddQuestionByCategoryParam {
  @ApiProperty()
  categoryIds: number[];

  @ApiProperty()
  questionCount: number;
}

export class ImportQuestionDto {
  @ApiProperty()
  @IsString()
  path: string;
}

export class CreateReadingContent {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  title!: string;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty()
  @IsNumber()
  categoryId!: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  type!: number;
}

export class UpdateReadingContent {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  title!: string;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty()
  @IsNumber()
  categoryId!: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  type!: number;
}
export class CreateQuestionDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  categoryId!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(2000)
  question!: string;

  @ApiProperty()
  @IsString()
  note!: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readingContentId: number;

  answers!: { answer: string, isCorrect: boolean }[]
}

export class UpdateQuestionDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  categoryId!: number;

  @ApiProperty()
  @IsString()
  question!: string;

  @ApiProperty()
  @IsString()
  note!: string;

  answers!: { answer: string, isCorrect: boolean }[]

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readingContentId: number;
}

export class CreateExamDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  duration: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  retry: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  referencePoint: number
}

export class UpdateExamDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  duration: number
}

