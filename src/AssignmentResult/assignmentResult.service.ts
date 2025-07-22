import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AssignmentResult,
  AssignmentResultDocument,
} from 'src/database/models/assignmentResult.schema';
import {
  IEvaluatorRequest,
  IEvaluatorResponse,
  IStudentRequest,
  IStudentResponse,
} from './assignmentResult.dto';

@Injectable()
export class AssignmentResultService {
  constructor(
    @InjectModel(AssignmentResult.name)
    private readonly assignmentResultModel: Model<AssignmentResultDocument>,
  ) {}

  async createAssignmentResult(data: IStudentRequest) {
    try {
      const studentId = new Types.ObjectId(data.studentId);
      const assignmentId = new Types.ObjectId(data.assignmentId);

      const isData = await this.assignmentResultModel.findOne({
        studentId,
        assignmentId,
      });
      if (isData) {
        throw new Error(`Assignment result already exists.`);
      }
      const result = await this.assignmentResultModel.create({
        ...data,
        studentId,
        assignmentId,
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to create assignment result: ${error.message}`);
    }
  }

  async getAssignmentResultById(studentId: string, assignmentId: string) {
    try {
      return await this.assignmentResultModel.findOne({
        studentId: studentId,
        assignmentId: assignmentId,
      });
    } catch (error) {
      throw new Error(`Failed to get assignment result: ${error.message}`);
    }
  }

  async getAssignmentResultByIdEvaluator(assignmentResultId: string) {
    try {
      return await this.assignmentResultModel
        .findOne({
          _id: new Types.ObjectId(assignmentResultId),
        })
        .populate({
          path: 'studentId',
          select: '-password',
        })
        .populate('assignmentId');
    } catch (error) {
      throw new Error(`Failed to get assignment result: ${error.message}`);
    }
  }

  async updateAssignmentResult(id: string, update: Partial<AssignmentResult>) {
    try {
      return await this.assignmentResultModel.findByIdAndUpdate(id, update, {
        new: true,
      });
    } catch (error) {
      throw new Error(`Failed to update assignment result: ${error.message}`);
    }
  }

  async updateAssignmentResultByStudent(
    id: string,
    update: IStudentRequest,
  ): Promise<IStudentResponse> {
    try {
      const data = await this.assignmentResultModel
        .findByIdAndUpdate(id, update, { new: true })
        .select(
          'assignmentId studentId responses evaluationResponses status score maxScore createdAt updatedAt',
        );
      return data;
    } catch (error) {
      throw new Error(`Failed to update assignment result: ${error.message}`);
    }
  }

  async updateAssignmentResultByEvaluator(
    id: string,
    update: IEvaluatorRequest,
  ): Promise<IEvaluatorResponse> {
    try {
      const data = await this.assignmentResultModel
        .findByIdAndUpdate(id, update, { new: true })
        .select('assignmentId studentId evaluatorId status score maxScore createdAt updatedAt');
      return data;
    } catch (error) {
      throw new Error(`Failed to update assignment result: ${error.message}`);
    }
  }

  async deleteAssignmentResult(id: string) {
    try {
      return await this.assignmentResultModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Failed to delete assignment result: ${error.message}`);
    }
  }

  async getAllAssignmentResults() {
    try {
      return await this.assignmentResultModel
        .find({})
        .populate({
          path: 'studentId',
          select: '-password',
        })
        .populate('assignmentId');
    } catch (error) {
      throw new Error(`Failed to get assignment results: ${error.message}`);
    }
  }

  async getAllAssignmentResultsForStudentId(studentId: string) {
    try {
      return await this.assignmentResultModel.find({
        studentId: new Types.ObjectId(studentId),
      });
    } catch (error) {
      throw new Error(`Failed to get assignment results: ${error.message}`);
    }
  }
}
