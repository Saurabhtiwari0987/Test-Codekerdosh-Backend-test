import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export enum EvaluationParamter {
    CODE_QUALITY = "codeQuality",
    FUNCTIONALITY = "functionality",
    UI_AND_UX = "uiAndUx",
}

export enum AssignmentStatus {
    PENDING = "pending",
    SUBMITTED = "submitted",
    REJECTED = "rejected",
    ACCEPTED = "accepted",
}


export class AssignmentResponses {
    hostedLink: string;
    videoLink: string;
    githubLink: string;
}

export class AssignmentEvaluationResponse {
    evaluationParameter: EvaluationParamter;
    score: number;
    maxScore: number;
    feedback: string;
}

export interface StudentAssignmentResponseDto {
    assignmentId: Types.ObjectId;
    studentId: Types.ObjectId;
}

export interface EvaluatorAssignmentResponseDto {
    assignmentId: Types.ObjectId;
    studentId: Types.ObjectId;
}

export type AssignmentResultDocument = AssignmentResult & Document<Types.ObjectId>;

@Schema({ timestamps: true })
export class AssignmentResult {

    @Prop({type: Types.ObjectId, required: true, ref: 'Assignment'})
    assignmentId: Types.ObjectId;

    @Prop({type: Types.ObjectId, required: true, ref: 'User'})
    studentId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'Evaluator'})
    evaluatorId: Types.ObjectId;

    @Prop({type: AssignmentResponses, required: true})
    responses: AssignmentResponses;

    @Prop({type: [AssignmentEvaluationResponse], default: []})
    evaluationResponses: AssignmentEvaluationResponse[];

    @Prop({type: Number, default: 0})
    maxScore: number;

    @Prop({type: Number, default: 0})
    score: number;

    @Prop({type: String, default: AssignmentStatus.PENDING, enum: AssignmentStatus})
    status: AssignmentStatus;

}

export const AssignmentResultSchema = SchemaFactory.createForClass(AssignmentResult);