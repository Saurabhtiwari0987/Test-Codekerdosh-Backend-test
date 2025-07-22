import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LiveClassService } from './liveClass.service';
import { LiveClass } from 'src/database/models/liveClass.schema';
import { AdminJwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { UserJwtAuthGuard } from 'src/Guards/jwt-user-auth.guard';
import { Request } from 'express';

@Controller('liveclass')
export class LiveClassController {
  constructor(private readonly liveClassService: LiveClassService) {}

  @UseGuards(AdminJwtAuthGuard)
  @Post('create')
  async createLiveClass(@Body() body: LiveClass) {
    try {
      return await this.liveClassService.createLiveClass(body);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while creating the live class',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(UserJwtAuthGuard)
  @Get('all')
  async getAllLiveClasses(@Req() req: Request) {
    try {
      console.log("the user id is", req['user']);
      const user = req['user'];
      return await this.liveClassService.getAllLiveClasses(user);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting all the live classes',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('admin/all')
  async getAllLiveClassesAdmin(@Req() req: Request) {
    try {
      const user = req['user'];
      return await this.liveClassService.getAllLiveClassesAdmin(user);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting all the live classes',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':id')
  async getLiveClassById(@Param('id') id: string) {
    try {
      return await this.liveClassService.getLiveClassById(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the live class by id',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(UserJwtAuthGuard)
  @Get('course/:id')
  async getLiveClassByCourseId(@Param('id') id: string, @Req() req: Request) {
    try {
      const user = req['user'];
      return await this.liveClassService.getLiveClassByCourseId(id, user);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the live class by id',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('admin/:id')
  async getLiveClassByIdAdmin(@Param('id') id: string, @Req() req: Request) {
    try {
      const user = req['user'];
      return await this.liveClassService.getLiveClassByCourseIdAdmin(id, user);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the live class by id',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AdminJwtAuthGuard)
  @Put(':id')
  async updateLiveClass(@Param('id') id: string, @Body() body: LiveClass) {
    try {
      return await this.liveClassService.updateLiveClass(id, body);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while updating the live class by id',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AdminJwtAuthGuard)
  @Delete(':id')
  async deleteLiveClass(@Param('id') id: string) {
    try {
      return await this.liveClassService.deleteLiveClass(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while deleting the live class by id',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
