import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Req,
  Res,
  Param,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserJwtAuthGuard } from '../Guards/jwt-user-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/database/models/user.schema';
import { AdminJwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { PaymentHistory } from 'src/database/models/payment-history.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: User) {
    try {
      const { username, password, phoneNumber, name } = body;
      return await this.authService.register(
        username,
        password,
        phoneNumber,
        name,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while registering the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() body): Promise<any> {
    try {
      const { username, password } = body;
      return await this.authService.login(username, password);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while loggin in the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(UserJwtAuthGuard)
  @Get('protected')
  getProtected(@Request() req) {
    try {
      return { message: 'Access granted', user: req.user };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while registering the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;
    // You can handle the user object here, e.g., create a JWT token and send it to the client
    res.redirect(`http://localhost:3000/success?user=${JSON.stringify(user)}`);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':id/courses')
  async getUserCourses(@Param('id') id: string) {
    try {
      return await this.authService.getUserCourses(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the user course',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AdminJwtAuthGuard)
  @Put(':id/courses/:courseId')
  async assignCourseToUser(
    @Param('id') userId: string,
    @Param('courseId') courseId: string,
  ) {
    try {
      return await this.authService.assignCourseToUser(courseId, userId);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while assign course to the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':id')
  async getUserInfo(@Param('id') id: string) {
    try {
      return await this.authService.getUserInfo(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @UseGuards(UserJwtAuthGuard)
  @Post('/payment-history')
  async getPaymentHistory(@Body() body: PaymentHistory) {
    try {
      return await this.authService.addPaymentHistory(body);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the payment history',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
