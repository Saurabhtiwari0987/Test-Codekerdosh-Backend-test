import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentHistoryDocument = PaymentHistory & Document;

@Schema()
export class PaymentHistory {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, enum: ['student', 'professional'] })
  userType: string;

  @Prop()
  institution: string;

  @Prop()
  totalDuration: string;

  @Prop({ required: true })
  selectedCourse: string;

  @Prop({ required: true })
  preferredLanguage: string;
}

export const PaymentHistorySchema =
  SchemaFactory.createForClass(PaymentHistory);
