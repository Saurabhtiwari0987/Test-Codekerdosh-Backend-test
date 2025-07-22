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
import { QuestionService } from './question.service';
import { CreateQuestionDto } from 'src/database/models/question.schema';
import { AdminJwtAuthGuard } from 'src/Guards/jwt-auth.guard';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AdminJwtAuthGuard)
  @Get('')
  async getAllQuestions() {
    return this.questionService.getAllQuestions();
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get(':id')
  async getQuestionById(@Param('id') id: string) {
    return this.questionService.getQuestionById(id);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Post('')
  async createQuestion(@Body() question: CreateQuestionDto) {
    return this.questionService.createQuestion(question);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Put(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() question: CreateQuestionDto,
  ) {
    return this.questionService.updateQuestion(id, question);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    return this.questionService.deleteQuestion(id);
  }
}
