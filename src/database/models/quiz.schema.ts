import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuizDocument = Quiz & Document<Types.ObjectId>;

export interface CreateQuizDto {
  title: string;
  questions: Types.ObjectId[];
  notes?: string[];
}

export interface UpdateQuizDto {
  title?: string;
  questions?: Types.ObjectId[];
  notes?: string[];
}

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [Types.ObjectId], ref: 'Question' })
  questions: Types.ObjectId[];

  @Prop({ default: false })
  notes: string[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
