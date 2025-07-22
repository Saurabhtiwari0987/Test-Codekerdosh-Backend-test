import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { Evaluator } from 'src/database/models/evaluator.schema';

@Controller('evaluator')
export class EvaluatorController {
  constructor(private readonly evaluatorService: EvaluatorService) {}

  @Post('register')
  async register(@Body() body: Evaluator) {
    try {
      const { email, password, phoneNumber } = body;
      return await this.evaluatorService.register(email, password, phoneNumber);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while registering the evaluator',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() body: Evaluator): Promise<any> {
    try {
      const { email, password } = body;
      return await this.evaluatorService.login(email, password);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while login the evaluator',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
