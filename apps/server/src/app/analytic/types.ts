import { ApiProperty } from "@nestjs/swagger";

export class GetUserReportQueryParam {
  @ApiProperty()
  type: string;

  @ApiProperty()
  from: string;
}
