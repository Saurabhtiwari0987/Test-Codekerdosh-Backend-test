import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdminDocument = Admin & Document<Types.ObjectId>;

@Schema()
export class Admin {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ default: false })
  isSuperAdmin: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
