import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class Recording {
  title: string;
  link: string;
}

export class Assignment {
  title: string;
  link: string;
}

export class Notes {
  title: string;
  links: string[];
  description?: string;
}

export class CodeFiles {
  title: string;
  links: string[];
  description?: string;
}

export type LiveClassDocument = LiveClass & Document;

@Schema({ timestamps: true })
export class LiveClass {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String, required: true, unique: true })
  link: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Number, required: true })
  duration: number;

  @Prop({ type: String, required: true })
  teacher: string;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ type: [Recording], default: [] })
  recordingLinks: Recording[];

  @Prop({ type: [Assignment], default: [] })
  assignments: Assignment[];

  @Prop({ type: [Notes], default: [] })
  notes: Notes[];

  @Prop({ type: [CodeFiles], default: [] })
  codeFiles: CodeFiles[];

  @Prop({ type: Types.ObjectId, ref: 'Quiz', default: [] })
  quizes: Types.ObjectId[];
}

export const LiveClassSchema = SchemaFactory.createForClass(LiveClass);
