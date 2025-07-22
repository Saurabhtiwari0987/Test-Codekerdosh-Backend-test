import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: 'Course', default: [] })
  courses: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);