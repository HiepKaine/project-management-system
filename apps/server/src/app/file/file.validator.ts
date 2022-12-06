import { IsNotEmpty } from 'class-validator';

export class UpdateProfileParams {
  @IsNotEmpty()
  files: Express.Multer.File[];
}
