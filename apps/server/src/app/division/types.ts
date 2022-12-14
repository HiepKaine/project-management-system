import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class createDivisionDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;
}

export class updateDivisionDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;
}
