import {
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  user: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(60)
  password: string;
}
