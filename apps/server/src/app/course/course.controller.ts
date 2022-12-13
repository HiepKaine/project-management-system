import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Course')
@Controller('course')
@ApiBearerAuth()
export class CourseController {}
