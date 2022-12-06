import { Controller, Get, Req, Res } from '@nestjs/common';
import { environment } from '@server/env/environment';
import { Request, Response } from 'express';
import { StaticServerService } from './static-server.service';
import { SeoParam } from './types';
@Controller()
export class StaticServerController {
  constructor(
    private staticServerService: StaticServerService
  ) { }

  // @Get('*')
  // async root(@Req() request: Request, @Res() res: Response) {
  //   const data: SeoParam = {
  //     title: environment.siteTitle,
  //     description: environment.siteDescription
  //   };
  //   try {
  //     const { originalUrl } = request;
  //     const { view, param } = await this.staticServerService.getPage(originalUrl);
  //     return res.render(view, param);
  //   } catch (error) {
  //     return res.render('404', data);
  //   }
  // }
}
