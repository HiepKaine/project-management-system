import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @MaxLength(255)
  image: string;

  @ApiProperty()
  @MaxLength(255)
  user: string;

  @ApiProperty()
  @MaxLength(65535)
  review: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  rateCount: number;

  @ApiProperty()
  type: number;

  @ApiProperty()
  reviewableId: number;
}

export class UpdateReviewDto {
  @ApiProperty({ required: false })
  @MaxLength(255)
  @IsOptional()
  image: string;

  @ApiProperty({ required: false })
  @MaxLength(255)
  @IsOptional()
  user: string;

  @ApiProperty({ required: false })
  @MaxLength(65535)
  @IsOptional()
  review: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rateCount: number;
}
