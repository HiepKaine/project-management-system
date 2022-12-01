import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';

import { FileController } from './file.controller';

@Module({
  imports: [SharedCommonModule],
  providers: [],
  controllers: [FileController],
})
export class FileModule { }
