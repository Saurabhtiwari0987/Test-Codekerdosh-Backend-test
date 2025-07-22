import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from '../database/models/course.schema';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { Notes, NotesDocument } from 'src/database/models/notes.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Notes.name) private notesModel: Model<NotesDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createdCourse = new this.courseModel(createCourseDto);
    return await createdCourse.save();
  }

  async findAll(): Promise<Course[]> {
    return await this.courseModel.find().populate('assignments.assignmentId').exec();
  }

  async findOne(id: string): Promise<Course> {
    return await this.courseModel.findById(id).populate('assignments.assignmentId').exec();
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    return await this.courseModel
      .findByIdAndUpdate(id, updateCourseDto, { new: true }).populate('assignments.assignmentId')
      .exec();
  }

  async remove(id: string): Promise<Course> {
    return await this.courseModel.findByIdAndDelete(id).exec();
  }

  async notes(id: string) {
    return await this.notesModel.find({ courses: { $in: [id] } }).exec();
  }

  async getCoursesByAssignmentId(id: string) {
    return await this.courseModel.find({ 'assignments.assignmentId': id }).populate('assignments.assignmentId')
  }

}
