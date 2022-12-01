import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateTestSessionDto {
  @ApiProperty()
  examId: number;

  @ApiProperty()
  examPackId: number;
}

export class CreateTestSessionAnswerDto {
  @ApiProperty()
  @IsNumber()
  questionId: number;

  @ApiProperty()
  @IsNumber()
  answerId: number;
}