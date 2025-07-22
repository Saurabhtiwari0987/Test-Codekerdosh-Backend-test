import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class AssignmentResponseDto {
  title: string;
  description: string;
  questionDocument: string[];
}

export enum EvaluationParameter {
    CODE_QUALITY = "codeQuality",
    FUNCTIONALITY = "functionality",
    UI_AND_UX = "uiAndUx",
    EDGE_CASES = "edgeCases"
}

export class EvaluationWithScore { 
  evaluationParameter: EvaluationParameter;
  score: number;
}

export enum AssignmentType {
  DSA = "dsa",
  WEBDEV = "webdev"
} 

export enum AssignmentCategory {
  REACT = "react",
}

export type AssignmentDocument = Assignment & Document<Types.ObjectId>;

@Schema({ timestamps: true })
export class Assignment {
  @Prop({ type: String, required: true })
  title: Types.ObjectId;

  @Prop({ type: String, enum: AssignmentType, required: true})
  assignmentType: AssignmentType;

  @Prop({ type: String, enum: AssignmentCategory })
  assignmentCategory: AssignmentCategory;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [String], required: true })
  questionDocument: string[];

  @Prop({type: Number, default: 0})
  maxScore: number;

  @Prop({type: [EvaluationWithScore], default: []})
  evaluationParameters: EvaluationWithScore[];
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
