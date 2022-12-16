import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class createTeacherDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  teacherCode: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  address: string;

  @ApiProperty()
  sex: number;

  @ApiProperty()
  level: number;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  nationality: string;

  @ApiProperty()
  divisionId: number;
}

export class updateTeacherDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  teacherCode: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  address: string;

  @ApiProperty()
  sex: number;

  @ApiProperty()
  level: number;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  nationality: string;

  @ApiProperty()
  divisionId: number;
}