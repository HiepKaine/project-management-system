import { ApiProperty } from '@nestjs/swagger';

export class AddRelatedCourseDto {
  @ApiProperty()
  relatedId: number;
}

export class AddRelatedExamPackToExamPackDto {
  @ApiProperty()
  examPackId: number;
}
