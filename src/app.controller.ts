// import { Controller, Get, Post, Query, Res } from '@nestjs/common';
// import { AppService } from './app.service';
// import { Response } from 'express';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }

//   @Post('homepage')
//   getHomepage(@Res() res: Response, @Query('txnid') query: string): any {
//     return res.redirect('https://codekerdos.in?txnid=' + query);
//   }
// }
import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  // Inject any service if needed in constructor

  @Get()
  getHello(): string {
    return 'NestJS backend is live!';
  }

  @Get('homepage')
  @Post('homepage')
  handleHomepage(@Res() res: Response, @Query('txnid') txnid: string): any {
    if (!txnid) {
      return res.status(400).json({ error: 'Missing txnid in query parameter' });
    }

    console.log('Received txnid:', txnid);

    const redirectUrl = `https://codekerdos.in?txnid=${txnid}`;
    return res.redirect(redirectUrl);
  }
}
