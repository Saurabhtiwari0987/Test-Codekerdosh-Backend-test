import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Question } from './question.schema';

export class QuestionResponseDto {
    questionId: Types.ObjectId | Question;
    answer: number[];
    score: number;
    maxScore: number;
    isCorrect: boolean;
}

export interface QuizResultDto {
    quizId: Types.ObjectId,
    studentId: Types.ObjectId,
    score: number,
    maxScore: number,
    responses: QuestionResponseDto[]
}


export type QuizResultDocument = QuizResult & Document<Types.ObjectId>;

@Schema({ timestamps: true })
export class QuizResult {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Quiz' })
  quizId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  studentId: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  maxScore: number;

  @Prop({ type: Number, default: 0 })
  score: number;

  @Prop({ type: [QuestionResponseDto] })
  responses: QuestionResponseDto[];

  @Prop({type: Boolean, default: false})
  isAttempted: boolean;

}

export const QuizResultSchema = SchemaFactory.createForClass(QuizResult);
