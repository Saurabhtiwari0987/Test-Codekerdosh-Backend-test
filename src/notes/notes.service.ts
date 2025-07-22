import { Injectable } from '@nestjs/common';
import { Notes, NotesDocument } from 'src/database/models/notes.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Notes.name) private notesModel: Model<NotesDocument>,
  ) {}

  async create(createNoteDto: Notes) {
    return this.notesModel.create(createNoteDto);
  }

  async findAll() {
    return this.notesModel.find().exec();
  }

  async findOne(id: string) {
    return this.notesModel.findById(id).populate('courses').exec();
  }

  async remove(id: string) {
    return this.notesModel.findByIdAndDelete(id).exec();
  }

  async attach(id: string, attachDto: { courseId: Types.ObjectId[] }) {
    return this.notesModel
      .findByIdAndUpdate(id, { courses: attachDto.courseId }, { new: true })
      .exec();
  }
}
