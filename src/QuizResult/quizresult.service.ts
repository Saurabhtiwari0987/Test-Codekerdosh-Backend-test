import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Question,
  QuestionDocument,
} from 'src/database/models/question.schema';
import {
  QuestionResponseDto,
  QuizResult,
  QuizResultDocument,
} from 'src/database/models/quizresult.schema';
import { User, UserDocument } from 'src/database/models/user.schema';

@Injectable()
export class QuizResultService {
  constructor(
    @InjectModel(QuizResult.name)
    private quizResultModel: Model<QuizResultDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getQuizResultById(
    quizId: string,
    studentId: string,
  ): Promise<QuizResult | { message: string; error?: string }> {
    try {
      const quizResult = await this.quizResultModel
        .findOne({ quizId: quizId, studentId: studentId })
        .populate('quizId')
        .populate('studentId');
      if (!quizResult) {
        throw new Error('Quiz result not found');
      }

      for (let i = 0; i < quizResult.responses.length; i++) {
        const question = await this.questionModel.findById(
          quizResult.responses[i].questionId,
        );
        quizResult.responses[i].questionId = question;
      }

      return quizResult;
    } catch (error) {
      return { message: 'Error fetching quiz result', error: error.message };
    }
  }

  async createQuizResult(
    quizId: string,
    studentId: string,
  ): Promise<QuizResult | { message: string; error?: string }> {
    try {
      const quizResult = await this.quizResultModel.findOne({
        quizId: quizId,
        studentId: studentId,
      });

      if (quizResult) {
        throw new Error('Quiz result already exists for this student and quiz');
      }

      const newQuizResult = await this.quizResultModel.create({
        quizId: quizId,
        studentId: studentId,
        isAttempted: true,
      });
      return newQuizResult;
    } catch (error) {
      return { message: 'Error creating quiz result', error: error.message };
    }
  }

  async updateQuizResult(
    quizId: string,
    studentId: string,
    body: QuestionResponseDto,
  ): Promise<QuizResult | { message: string; error?: string }> {
    try {
      const quizResult = await this.quizResultModel.findOne({
        quizId: quizId,
        studentId: studentId,
      });

      if (!quizResult) {
        throw new Error('Quiz result not found');
      }

      const previousResponses = quizResult.responses || [];
      // check if the response already exists
      const existingResponse = previousResponses.find(
        (response) =>
          response.questionId.toString() === body.questionId.toString(),
      );

      // fetch the question and check if options are correct

      const question = await this.questionModel.findById(body.questionId);
      if (!question) {
        return { message: 'Error question not found', error: '' };
      }

      function areArraysEqual(arr1: number[], arr2: number[]): boolean {
        if (arr1.length !== arr2.length) {
          return false; // Arrays have different lengths
        }

        // Sort both arrays and compare each element
        const sortedArr1 = [...arr1].sort();
        const sortedArr2 = [...arr2].sort();

        return sortedArr1.every((value, index) => value === sortedArr2[index]);
      }

      const isCorrect = areArraysEqual(body.answer, question.correctOptions);

      if (existingResponse) {
        // update the existing response
        existingResponse.answer = body.answer;

        if (existingResponse.isCorrect !== isCorrect) {
          if (isCorrect) {
            quizResult.score = quizResult.score + question.maxScore; // assuming each question is worth its max score
          } else {
            quizResult.score = quizResult.score - question.maxScore; // assuming each question is worth its max score
          }
        }

        existingResponse.isCorrect = isCorrect;
        existingResponse.score = isCorrect ? question.maxScore : 0; // assuming each question is worth its max score

        // find previous response index and place the new response in the same index
        const index = previousResponses.findIndex(
          (response) =>
            response.questionId.toString() === body.questionId.toString(),
        );
        if (index) previousResponses[index] = existingResponse;
      } else {
        let newResponse: QuestionResponseDto = { ...body };
        if (isCorrect) {
          quizResult.score = quizResult.score + question.maxScore; // assuming each question is worth its max score
          newResponse.isCorrect = true;
          newResponse.score = question.maxScore;
          newResponse.maxScore = question.maxScore;
        } else {
          quizResult.score = quizResult.score;
          newResponse.isCorrect = false;
          newResponse.score = 0;
          newResponse.maxScore = question.maxScore;
        }
        // add the new response
        previousResponses.push(newResponse);
      }
      quizResult.responses = [...previousResponses];
      const updatedQuizResult = await this.quizResultModel.findByIdAndUpdate(
        quizResult._id,
        { responses: quizResult.responses, score: quizResult.score },
        { new: true },
      );
      return updatedQuizResult;
    } catch (error) {
      return { message: 'Error updating quiz result', error: error.message };
    }
  }

  async getStudentScoreCardDetails(
    studentId: string,
  ): Promise<
    | { quizes: QuizResult[]; totalScore: number }
    | {
        message: string;
        error?: string;
        quizes: QuizResult[];
        totalScore: number;
      }
  > {
    try {
      const quizResults = await this.quizResultModel.find({
        studentId: studentId,
      });

      if (!quizResults || quizResults.length === 0) {
        return { quizes: [], totalScore: 0 };
      }

      return {
        quizes: quizResults,
        totalScore: quizResults.reduce((acc, quiz) => acc + quiz.score, 0),
      };
    } catch (error) {
      return {
        message: 'Error fetching student score card details',
        error: error.message,
        quizes: [],
        totalScore: 0,
      };
    }
  }

  async getLeaderboardByCourseId(
    courseId: string,
  ): Promise<
    | { studentId: string; studentName: string; score: number, percentile: number }[]
    | { message: string; error?: string }
  > {
    try {
      // get all student for the course
      const students = await this.userModel
        .find({ courses: new Types.ObjectId(courseId) })
        .select(['_id', 'name']);
      if (!students || students.length === 0) {
        return [];
      }

      // get totalScores for the students
      const leaderboard = await Promise.all(
        students.map(async (student) => {
          const quizResults = await this.getStudentScoreCardDetails(
            student._id.toString(),
          );
          if (
            quizResults &&
            quizResults.quizes &&
            quizResults.quizes.length > 0
          ) {
            return {
              studentId: student._id.toString(),
              studentName: student.name,
              score: quizResults.totalScore,
            };
          } else {
            return {
              studentId: student._id.toString(),
              studentName: student.name,
              score: 0,
            };
          }
        }),
      );

      // sort the leaderboard by score in descending order
      // After sorting the leaderboard by score in descending order
      const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score);

      // Add percentile for each student
      const totalStudents = sortedLeaderboard.length;
      const leaderboardWithPercentile = sortedLeaderboard.map((entry, idx) => {
        // Number of students with a lower score
        const numLower = sortedLeaderboard.filter(
          (e) => e.score < entry.score,
        ).length;
        const percentile = (numLower / totalStudents) * 100;
        return { ...entry, percentile: Math.round(percentile) };
      });

      return leaderboardWithPercentile;
    } catch (error) {
      return { message: 'Error fetching leaderboard', error: error.message };
    }
  }
}
