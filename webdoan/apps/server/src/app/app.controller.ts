import { Controller, Get, Res } from '@nestjs/common';
import { environment } from '@server/env/environment';
import { Response } from 'express';
import { SeoParam } from './static-server/types';

@Controller()
export class AppController {


  @Get()
  async root(@Res() res: Response) {
    const data: SeoParam = {
      title: environment.siteTitle,
      description: environment.siteDescription
    };
    return res.render('index', data);
  }
}
