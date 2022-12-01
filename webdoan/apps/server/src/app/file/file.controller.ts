import {
  diskStorage,
  Multer,
} from 'multer';
import { join } from 'path';

import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiMultiFile,
  ApiResponseService,
} from '@server/common';
import { environment } from '@server/env/environment';

import { FileTransformer } from './file.transformer';

@ApiTags('File')
@ApiBearerAuth()
@Controller('api/file')
export class FileController {
  public file: Multer;

  constructor(private response: ApiResponseService) { }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(FilesInterceptor('files', environment.maxFileUploadAllowed ?? 10, {
    storage: diskStorage({
      destination: join(__dirname, 'public', 'uploads'),
      filename: (req, file: Express.Multer.File, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');
        cb(null, `${randomName}-${file.originalname}`);
      },
    }),
    fileFilter: (req, file: Express.Multer.File, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|xlsx|xls)$/)) {
        return new Error('Only image or excel files are allowed!');
      }
      cb(null, true);
    },
  }))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    const result = files.map(item => (
      {
        ...item,
        ...{
          url: `${environment.appUrl}/uploads/${item.filename}`
        },
        ...{
          path: `/uploads/${item.filename}`
        }
      }))
    return this.response.collection(result, FileTransformer);
  }
}
