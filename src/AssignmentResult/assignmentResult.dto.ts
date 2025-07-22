import {Types} from 'mongoose';
import { AssignmentEvaluationResponse, AssignmentResponses, AssignmentStatus } from 'src/database/models/assignmentResult.schema';

export interface IStudentRequest {

    assignmentId: Types.ObjectId;
    studentId: Types.ObjectId;
    responses: AssignmentResponses;

}

export interface IEvaluatorRequest {

    assignmentId: Types.ObjectId;
    studentId: Types.ObjectId;
    evaluatorId: Types.ObjectId;
    evaluationResponses: AssignmentEvaluationResponse[];
    score: number;
    status: AssignmentStatus;

}

export interface IStudentResponse {

    assignmentId: Types.ObjectId;
    studentId: Types.ObjectId;
    responses: AssignmentResponses;
    evaluationResponses: AssignmentEvaluationResponse[]
    status: AssignmentStatus;
    score: number;
    maxScore: number;

}

export interface IEvaluatorResponse {

    assignmentId: Types.ObjectId;
    studentId: Types.ObjectId;
    evaluatorId: Types.ObjectId;
    status: AssignmentStatus;
    score: number;
    maxScore: number;

}