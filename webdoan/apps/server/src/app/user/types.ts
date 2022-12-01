import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class AdminChangePasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class UserChangePasswordDto {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class AdminCreateAccountDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(60)
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(255)
  image: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(255)
  phoneNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(255)
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(255)
  lastName: string;

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
}

export class AddUserCourseDto {
  @ApiProperty()
  courseId: number;
}

export class AddUserExamPackDto {
  @ApiProperty()
  examPackId: number;
}


export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  phoneNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  image: string;

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

}


export class AddFreeCourseDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  courseId: number
}

export class AddFreeExamPackDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  examPackId: number
}
