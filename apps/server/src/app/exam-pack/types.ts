import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { FindManyQueryParamWithCategory } from "../@core/types";

export class GetActiveExamPackQueryParam extends FindManyQueryParamWithCategory {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  isFree: number;
}

export class CreateExamPackDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  lecturer: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  video: string;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @MaxLength(255)
  image: string;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  originalPrice: number;

  @ApiProperty()
  isFree: boolean;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  categoryId: boolean;

}

export class UpdateExamPackDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  lecturer: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  video: string;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @MaxLength(255)
  image: string;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  originalPrice: number;

  @ApiProperty()
  isFree: boolean;

}

export class AddExamDto {
  @ApiProperty()
  examId: number;
}

export class AddHighlightDto {
  @ApiProperty()
  courseId: number;
}
