import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../database/models/course.schema';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Notes, NotesSchema } from 'src/database/models/notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: Notes.name, schema: NotesSchema }]),
  ],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
