import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Admin, AdminDocument } from 'src/database/models/admin.schema';
import {
  LiveClass,
  LiveClassDocument,
} from 'src/database/models/liveClass.schema';
import { Quiz, QuizDocument } from 'src/database/models/quiz.schema';
import {
  QuizResult,
  QuizResultDocument,
} from 'src/database/models/quizresult.schema';
import { User, UserDocument } from 'src/database/models/user.schema';

@Injectable()
export class LiveClassService {
  constructor(
    @InjectModel(LiveClass.name)
    private liveClassModel: Model<LiveClassDocument>,
    @InjectModel(QuizResult.name)
    private quizResultModel: Model<QuizResultDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>
    
  ) {}

  async createLiveClass(payload: LiveClass) {
    const newLiveClass = new this.liveClassModel(payload);
    const liveClass = await newLiveClass.save();
    return liveClass;
  }

  async getAllLiveClasses(user: any) {
    const liveClasses = await this.liveClassModel.find().populate('course');

    // check the quizes array and check this user has given the quiz or not

    const liveClassDuplicate = liveClasses.map((liveClass) => ({
      ...liveClass.toObject(),
      isAttempted: false,
    }));
    const userData = await this.userModel.findOne({ username: user.username });

    for (let i = 0; i < liveClassDuplicate.length; i++) {
      const quizResult = await this.quizResultModel.findOne({
        quizId: liveClassDuplicate[i].quizes[0],
        studentId: userData.id,
      });
      if (quizResult) {
        liveClassDuplicate[i].isAttempted = true;
      } else {
        liveClassDuplicate[i].isAttempted = false;
      }
      
      for (let j = 0; j < liveClassDuplicate[i].quizes.length; j++) {
        const quiz = await this.quizModel.findById(liveClassDuplicate[i].quizes[j]);
        if (quiz) {
          liveClassDuplicate[i].quizes[j] = {
            _id: quiz._id,
            // @ts-ignore
            title: quiz.title,
          };
        }
      }

    }

    return liveClassDuplicate;
  }

  async getAllLiveClassesAdmin(user: any) {
    const liveClasses = await this.liveClassModel.find().populate('course');

    // check the quizes array and check this user has given the quiz or not

    const liveClassDuplicate = liveClasses.map((liveClass) => ({
      ...liveClass.toObject(),
      isAttempted: false,
    }));
    const userData = await this.adminModel.findOne({ email: user.email });

    for (let i = 0; i < liveClassDuplicate.length; i++) {
      const quizResult = await this.quizResultModel.findOne({
        quizId: liveClassDuplicate[i].quizes[0],
        studentId: userData.id,
      });
      if (quizResult) {
        liveClassDuplicate[i].isAttempted = true;
      } else {
        liveClassDuplicate[i].isAttempted = false;
      }

      for (let j = 0; j < liveClassDuplicate[i].quizes.length; j++) {
        const quiz = await this.quizModel.findById(liveClassDuplicate[i].quizes[j]);
        if (quiz) {
          liveClassDuplicate[i].quizes[j] = {
            _id: quiz._id,
            // @ts-ignore
            title: quiz.title,
          };
        }
      }
    }

    return liveClassDuplicate;
  }


  async getLiveClassById(id: string) {
    const liveClass = await this.liveClassModel.findById(id).populate('course');

    for (let j = 0; j < liveClass.quizes.length; j++) {
      const quiz = await this.quizModel.findById(liveClass.quizes[j]);
      if (quiz) {
        liveClass.quizes[j] = {
          _id: quiz._id,
          // @ts-ignore
          title: quiz.title,
        };
      }
    }

    return liveClass;
  }

  async getLiveClassByCourseId(id: string, user: any) {
    const liveClasses = await this.liveClassModel
      .find({ course: id }).populate('course')
      .sort({ date: 1 });

    // check the quizes array and check this user has given the quiz or not

    const liveClassDuplicate = liveClasses.map((liveClass) => ({
      ...liveClass.toObject(),
      isAttempted: false,
    }));
    const userData = await this.userModel.findOne({ username: user.username });

    for (let i = 0; i < liveClassDuplicate.length; i++) {
      if (liveClassDuplicate[i].quizes[0]) {
        const quizResult = await this.quizResultModel.findOne({
          quizId: liveClassDuplicate[i].quizes[0],
          studentId: userData.id,
        });
        if (quizResult) {
          liveClassDuplicate[i].isAttempted = true;
        } else {
          liveClassDuplicate[i].isAttempted = false;
        }
      }

      for (let j = 0; j < liveClassDuplicate[i].quizes.length; j++) {
        const quiz = await this.quizModel.findById(liveClassDuplicate[i].quizes[j]);
        if (quiz) {
          liveClassDuplicate[i].quizes[j] = {
            _id: quiz._id,
            // @ts-ignore
            title: quiz.title,
          };
        }
      }

    }

    return liveClassDuplicate;
  }

  async getLiveClassByCourseIdAdmin(id: string, user: any) {
    const liveClasses = await this.liveClassModel
      .find({ course: id }).populate('course')
      .sort({ date: 1 });

    // check the quizes array and check this user has given the quiz or not

    const liveClassDuplicate = liveClasses.map((liveClass) => ({
      ...liveClass.toObject(),
      isAttempted: false,
    }));
    const userData = await this.adminModel.findOne({ email: user.email });

    for (let i = 0; i < liveClassDuplicate.length; i++) {
      if (liveClassDuplicate[i].quizes[0]) {
        const quizResult = await this.quizResultModel.findOne({
          quizId: liveClassDuplicate[i].quizes[0],
          studentId: userData.id,
        });
        if (quizResult) {
          liveClassDuplicate[i].isAttempted = true;
        } else {
          liveClassDuplicate[i].isAttempted = false;
        }
      }

      for (let j = 0; j < liveClassDuplicate[i].quizes.length; j++) {
        const quiz = await this.quizModel.findById(liveClassDuplicate[i].quizes[j]);
        if (quiz) {
          liveClassDuplicate[i].quizes[j] = {
            _id: quiz._id,
            // @ts-ignore
            title: quiz.title,
          };
        }
      }

    }

    return liveClassDuplicate;
  }

  async updateLiveClass(id: string, payload: LiveClass) {
    const liveClass = await this.liveClassModel.findByIdAndUpdate(id, payload, {
      new: true,
    }).populate('course');

    for (let j = 0; j < liveClass.quizes.length; j++) {
      const quiz = await this.quizModel.findById(liveClass.quizes[j]);
      if (quiz) {
        liveClass.quizes[j] = {
          _id: quiz._id,
          // @ts-ignore
          title: quiz.title,
        };
      }
    }


    return liveClass;
  }

  async deleteLiveClass(id: string) {
    const liveClass = await this.liveClassModel.findByIdAndDelete(id);
    return liveClass;
  }
}
