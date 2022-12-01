import {
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(60)
  password: string;

}
