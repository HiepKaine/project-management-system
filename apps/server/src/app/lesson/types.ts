import {
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';


export class CreateLessonDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(65535)
  description: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  link: string;
}

export class UpdateLessonDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(65535)
  description: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  link: string;
}
