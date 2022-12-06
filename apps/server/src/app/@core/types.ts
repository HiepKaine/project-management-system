import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class FindManyQueryParam {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  page: number

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  limit: number

  @ApiProperty({ required: false })
  @IsOptional()
  keyword: string
}

export class FindManyQueryParamWithCategory extends FindManyQueryParam {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  categoryId: number

}
