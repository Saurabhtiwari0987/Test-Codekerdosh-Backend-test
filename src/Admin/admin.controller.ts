import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from 'src/database/models/admin.schema';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Post('register')
  async register(@Body() body: Admin) {
    try {
      const { email, password, phoneNumber } = body;
      return await this.adminService.register(email, password, phoneNumber);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while registering the admin',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() body: Admin): Promise<any> {
    try {
      const { email, password } = body;
      return await this.adminService.login(email, password);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while login the admin',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
