import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Assignment } from "src/database/models/assignment.schema";

@Injectable()
export class AssignmentService {
  
    constructor(@InjectModel(Assignment.name) private assignmentModel: Model<Assignment>) {}

    async getAssignmentById(assignmentId: string): Promise<Assignment | { message: string; error?: string }> {
        try {
            const assignment = await this.assignmentModel.findById(assignmentId);
            if (!assignment) {
                throw new Error("Assignment not found");
            }
            return assignment;
        } catch (error) {
            return { message: "Error fetching assignment", error: error.message };
        }
    }

    async getAllAssignments(): Promise<Assignment[]> {
        try {
            return await this.assignmentModel.find().exec();
        } catch (error) {
            throw new Error("Error fetching assignments: " + error.message);
        }
    }

    async createAssignment(assignmentData: Partial<Assignment>): Promise<Assignment | { message: string; error?: string }> {
        try {
            const newAssignment = new this.assignmentModel(assignmentData);
            newAssignment.maxScore = assignmentData.evaluationParameters.map(params => params.score).reduce( (score, prevScore) => (score + prevScore) )
            return await newAssignment.save();
        } catch (error) {
            return { message: "Error creating assignment", error: error.message };
        }
    }


    async updateAssignment(assignmentId: string, assignmentData: Partial<Assignment>): Promise<Assignment | { message: string; error?: string }> {
        try {
            const updatedAssignment = await this.assignmentModel.findByIdAndUpdate(assignmentId, assignmentData, { new: true });
            if (!updatedAssignment) {
                throw new Error("Assignment not found");
            }
            return updatedAssignment;
        } catch (error) {
            return { message: "Error updating assignment", error: error.message };
        }
    }

    async deleteAssignment(assignmentId: string): Promise<{ message: string; error?: string }> {
        try {
            const result = await this.assignmentModel.findByIdAndDelete(assignmentId);
            if (!result) {
                throw new Error("Assignment not found");
            }
            return { message: "Assignment deleted successfully" };
        } catch (error) {
            return { message: "Error deleting assignment", error: error.message };
        }
    }


}