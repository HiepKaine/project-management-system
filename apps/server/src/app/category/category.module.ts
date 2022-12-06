import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [SharedCommonModule],
  controllers: [CategoryController],
  providers: [CategoryService, ],
})
export class CategoryModule { }
