import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Quiz, QuizSchema } from 'src/database/models/quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
  ],
  providers: [QuizService],
  controllers: [QuizController],
})
export class PaymentModule {}
