import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface FileUploadDto {
  title: string;
  category: string;
  file: any
}

export type FileDocument = File & Document<Types.ObjectId>;

@Schema()
export class File {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  link: string;

}

export const FileSchema = SchemaFactory.createForClass(File);
