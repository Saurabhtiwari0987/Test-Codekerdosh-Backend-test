import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from 'src/database/models/question.schema';
import { QuestionService } from './question.service';
import { QuizController } from 'src/Quiz/quiz.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
  ],
  providers: [QuestionService],
  controllers: [QuizController],
})
export class PaymentModule {}
