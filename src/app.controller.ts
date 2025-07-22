import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('homepage')
  getHomepage(@Res() res: Response, @Query('txnid') query: string): any {
    return res.redirect('https://codekerdos.in?txnid=' + query);
  }
}
