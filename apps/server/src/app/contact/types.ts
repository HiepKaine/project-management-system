import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindContactQueryParam {
  @ApiProperty({ required: false })
  @IsOptional()
  keyword: string;

  @ApiProperty({ required: false })
  @IsOptional()
  page: number;
}

export class CreateContactDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(new RegExp('^[0-9]*$'))
  @MinLength(9)
  @MaxLength(10)
  phone: string;

  @ApiProperty({ required: false })
  @MaxLength(2000)
  @IsOptional()
  content: string;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  position: string;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  organization: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  type: number;
}

export class UpdateContactDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(new RegExp('^[0-9]*$'))
  @MinLength(9)
  @MaxLength(10)
  phone: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  type: number;
}

export class UpdateContactStatusDto {
  @ApiProperty()
  status: number;
}
