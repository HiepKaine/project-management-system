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
  @IsString()
  @MaxLength(255)
  sex: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  level: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  nationality: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  subject: string;
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
  @IsString()
  @MaxLength(255)
  sex: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  level: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  nationality: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  subject: string;
}