import { ApiProperty } from '@nestjs/swagger';

export class AddRelatedCourseDto {
  @ApiProperty()
  relatedId: number;
}

export class AddRelatedCourseForExamPackDto {
  @ApiProperty()
  courseId: number;
}