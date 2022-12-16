import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class createStudentDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  facultyId: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  classId: number;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  studentCode: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  image: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  studentYear: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  idCard: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  phoneNumber: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  sex: number;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  date: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  address: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  ethnic: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  religion: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  fatherName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  fatherJob: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  fatherPhoneNumber: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  motherName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  motherJob: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  motherPhoneNumber: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  note: string;
}

export class updateStudentDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  facultyId: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  classId: number;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  studentCode: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  image: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  studentYear: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  idCard: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  phoneNumber: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  sex: number;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  date: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  address: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  ethnic: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  religion: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  fatherName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  fatherJob: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  fatherPhoneNumber: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  motherName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  motherJob: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  motherPhoneNumber: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  note: string;
}
