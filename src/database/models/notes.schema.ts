import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notes {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  link: string;

  @Prop({ type: [String], default: [] })
  categories?: string[];

  @Prop({ type: String })
  description?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Course', default: [] })
  courses: Types.ObjectId[];
}

export type NotesDocument = Notes & Document;
export const NotesSchema = SchemaFactory.createForClass(Notes);
