import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { AdminJwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { UserJwtAuthGuard } from 'src/Guards/jwt-user-auth.guard';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AdminJwtAuthGuard)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    try {
      return await this.courseService.create(createCourseDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while creating the course',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(UserJwtAuthGuard)
  @Get()
  async findAll() {
    try {
      return await this.courseService.findAll();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the courses',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('admin')
  async findAllForAdmin() {
    try {
      return await this.courseService.findAll();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the courses',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.courseService.findOne(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the course by id',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':id/notes')
  async notes(@Param('id') id: string) {
    try {
      return await this.courseService.notes(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the course notes',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('admin/:id')
  async findOneAdmin(@Param('id') id: string) {
    try {
      return await this.courseService.findOne(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the course by id for admin',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('assignment-courses/:id')
  async findCoursesByAssignment(@Param('id') id: string) {
    try {
      return await this.courseService.getCoursesByAssignmentId(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the courses by assignment id for admin',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(UserJwtAuthGuard)
  @Get('student/assignment-courses/:id')
  async findCoursesByAssignmentStudent(@Param('id') id: string) {
    try {
      return await this.courseService.getCoursesByAssignmentId(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while getting the courses by assignment id for student',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AdminJwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    try {
      return await this.courseService.update(id, updateCourseDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while updating the course',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AdminJwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.courseService.remove(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while removing the course',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
