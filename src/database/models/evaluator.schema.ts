import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EvaluatorDocument = Evaluator & Document<Types.ObjectId>;

@Schema()
export class Evaluator {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;

}

export const EvaluatorSchema = SchemaFactory.createForClass(Evaluator);
