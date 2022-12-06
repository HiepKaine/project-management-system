import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateSliderDto {
  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  @MaxLength(100)
  alt: string;

  @ApiProperty()
  order: number;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  url: string;
}

export class UpdateSliderDto {
  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  alt: string;

  @ApiProperty()
  order: number;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  url: string;
}

