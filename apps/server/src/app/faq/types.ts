import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class FindFaqQueryParam {
  @ApiProperty({ required: false })
  @IsOptional()
  keyword: string;

  @ApiProperty({ required: false })
  @IsOptional()
  page: number;
}

export class CreateFaqDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  question: string;

  @ApiProperty()
  @IsString()
  answer: string;

}

export class UpdateFaqDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  question: string;

  @ApiProperty()
  @IsString()
  answer: string;

}

