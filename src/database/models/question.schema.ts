import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum QuestionType {
  SINGLE_CHOICE = 'single_choice',
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  WORD_ANSWER = 'word_answer',
  CODE = 'code',
}

export interface Option {
  text: string;
  media: string[];
}

export interface CreateQuestionDto {
  title: string;
  options: string[] | Option[];
  correctOptions: number[];
  maxScore?: number;
  notes?: string[];
  questionType?: QuestionType;
  media?: string[];
}

export interface UpdateQuestionDto {
  title?: string;
  options: string[] | Option[];
  correctOptions: number[];
  maxScore?: number;
  notes?: string[];
  questionType?: QuestionType;
  media?: string[];
}

export type OptionType = string | Option;

export type QuestionDocument = Question & Document<Types.ObjectId>;

@Schema({  timestamps: true })
export class Question {
  @Prop({ required: true })
  title: string;

  @Prop( { type: String, enum: QuestionType } )
  questionType?: string;

  @Prop({ type: { }, required: true })
  options: OptionType[];

  @Prop({ required: true })
  correctOptions: number[];

  @Prop({ default: 10 })
  maxScore: number;

  @Prop({ default: false })
  notes: string[];

  @Prop({ default: [] })
  media: string[];

}

export const QuestionSchema = SchemaFactory.createForClass(Question);
