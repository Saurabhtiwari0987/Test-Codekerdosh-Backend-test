import { QuizService } from './quiz.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateQuizDto, UpdateQuizDto } from 'src/database/models/quiz.schema';
import { AdminJwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { UserJwtAuthGuard } from 'src/Guards/jwt-user-auth.guard';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(AdminJwtAuthGuard)
  @Get('')
  async getAllQuizzes() {
    return this.quizService.getAllQuizzes();
  }

  @UseGuards(AdminJwtAuthGuard)
  @Put(':id')
  async updateQuiz(@Param('id') id: string, quizData: UpdateQuizDto) {
    return this.quizService.updateQuiz(id, quizData);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Delete(':id')
  async deleteQuiz(@Param('id') id: string) {
    return this.quizService.deleteQuiz(id);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get(':id')
  async getQuizById(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  @UseGuards(UserJwtAuthGuard)
  @Get(':id/student')
  async getQuizByIdStudent(@Param('id') id: string) {
    return this.quizService.getQuizByIdStudent(id);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Post('')
  async createQuiz(@Body() quizData: CreateQuizDto) {
    return this.quizService.createQuiz(quizData);
  }
}
