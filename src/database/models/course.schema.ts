import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class CourseDoc {
  title: string;
  link: string;
}

export class CourseNote {
  title: string;
  link: string;
  category?: string;
}

export class CourseVideo {
  title: string;
  link: string;
}

export class CourseModule {
  title: string;
  description: string;
}

export class CourseAssignmentMeta {
  liveDate: Date;
  dueDate: Date;
}

@Schema({ _id: false })
export class CourseAssignment {
  @Prop({ type: Types.ObjectId, ref: 'Assignment', required: true })
  assignmentId: Types.ObjectId;

  @Prop({ type: CourseAssignmentMeta, default: {} })
  meta: {
    liveDate: Date;
    dueDate: Date;
  };
}

export const CourseAssignmentSchema = SchemaFactory.createForClass(CourseAssignment);

export type CourseDocument = Course & Document<Types.ObjectId>;

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [CourseVideo], required: true, default: [] })
  courseVideos: CourseVideo[];

  @Prop({ type: [CourseDoc], required: true, default: [] })
  courseDocs: CourseDoc[];

  @Prop({ type: [String], required: true, default: [] })
  technologies: string[];

  @Prop({ type: [CourseModule], required: true })
  modules: CourseModule[];

   @Prop({ type: [CourseAssignmentSchema], default: [] })
  assignments: CourseAssignment[];
  
  @Prop({ type: [CourseNote], default: [] })
  courseNotes?: CourseNote[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
