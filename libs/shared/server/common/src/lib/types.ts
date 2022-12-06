import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class PaginatedQueryParam {
  @ApiProperty({ required: false })
  @Type(() => Number)
  page?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  limit?: number;
}
