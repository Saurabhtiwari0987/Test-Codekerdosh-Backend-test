import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateQuizDto, Quiz, QuizDocument, UpdateQuizDto } from "src/database/models/quiz.schema";

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async getQuizById(id: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(id).populate('questions');
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    return quiz;
    }

    async getQuizByIdStudent(id: string): Promise<Quiz> {
        const quiz = await this.quizModel.findById(id).populate('questions');
        
        // remove correctOptions from the question object

        if (quiz) {
            quiz.questions.forEach((question) => {
                try {
                    // @ts-ignore
                    console.log(question.correctOptions);
                    // @ts-ignore
                    question.correctOptions = null;

                } catch (error) {

                }
                
            });
        }

        if (!quiz) {
          throw new Error('Quiz not found');
        }
        return quiz;
    }

    async createQuiz(quizData: CreateQuizDto): Promise<Quiz> {
        const quiz = await this.quizModel.create(quizData);
        return quiz;
        }

    async updateQuiz(id: string, quizData: UpdateQuizDto): Promise<Quiz> {
        const quiz = await this.quizModel.findByIdAndUpdate(id, quizData);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        return quiz;
    }

    async deleteQuiz(id: string): Promise<void> {
        const result = await this.quizModel.findByIdAndDelete(id);
        if (!result) {
            throw new Error('Quiz not found');
        }
        return;
    }

    async getAllQuizzes(): Promise<Quiz[]> {
        const quizzes = await this.quizModel.find({}).populate('questions');
        return quizzes;
    }

}