import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class FindOptionQueryParam {
  @ApiProperty({ required: false })
  @IsOptional()
  keyword: string;
}

export class CreateOptionDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  key: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  label: string;

  @ApiProperty()
  value: number;

  @ApiProperty({required: false})
  @IsOptional()
  type: string;

  @ApiProperty({required: false})
  @IsOptional()
  extra: "json";
}

export class UpdateOptionDto {
  @ApiProperty()
  value: number;
}
