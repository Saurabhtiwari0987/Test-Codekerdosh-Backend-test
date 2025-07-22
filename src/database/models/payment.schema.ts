import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({ required: true })
  order_id: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  receipt: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: false })
  course_id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: false })
  payment_id: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
