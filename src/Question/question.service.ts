import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateQuestionDto, Question, QuestionDocument } from "src/database/models/question.schema";
import { UpdateQuizDto } from "src/database/models/quiz.schema";

@Injectable()
export class QuestionService {

    constructor( @InjectModel(Question.name) private questionModel: Model<QuestionDocument> ) {}

    async getQuestionById(id: string): Promise<Question> {
        const question = await this.questionModel.findById(id);
        if (!question) {
            throw new Error('Question not found');
        }
        return question;
    }

    async createQuestion(questionData: CreateQuestionDto): Promise<Question> {
        const question = await this.questionModel.create(questionData);
        return question;
    }

    async updateQuestion(id: string, questionData: UpdateQuizDto): Promise<Question> {
        const question = await this.questionModel.findByIdAndUpdate

        (id, questionData);
        if (!question) {
            throw new Error('Question not found');
        }
        return question;

    }

    async deleteQuestion(id: string): Promise<void> {
        const result = await this.questionModel.findByIdAndDelete(id);
        if (!result) {
            throw new Error('Question not found');
        }
        return;
    }

    async getAllQuestions(): Promise<Question[]> {
        const questions = await this.questionModel.find({});
        return questions;
    }
}