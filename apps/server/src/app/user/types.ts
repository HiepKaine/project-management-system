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
  phoneNumber: string;
}

export class UpdateUserDto {
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
}
