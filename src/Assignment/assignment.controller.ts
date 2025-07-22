import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AssignmentService } from "./assignment.service";
import { AdminJwtAuthGuard } from "src/Guards/jwt-auth.guard";
import { Assignment } from "src/database/models/assignment.schema";

@Controller('assignment')
export class AssignmentController {

    constructor( private assignmentService: AssignmentService ) {}

    @UseGuards(AdminJwtAuthGuard)
    @Get('')
    async getAllAssignments() {
        const assignments = await this.assignmentService.getAllAssignments();
        return assignments;
    }

    @UseGuards(AdminJwtAuthGuard)
    @Get('/:id')
    async getAssignmentById(@Param('id') assignmentId: string) {
        const assignment = await this.assignmentService.getAssignmentById(assignmentId);
        if (typeof assignment === 'object' && 'message' in assignment) {
            return { message: assignment.message, error: assignment.error };
        }
        return assignment;
    }

    @UseGuards(AdminJwtAuthGuard)
    @Post('')
    async createAssignment(@Body() assignmentData: Partial<Assignment>) {
        const newAssignment = await this.assignmentService.createAssignment(assignmentData);
        if (typeof newAssignment === 'object' && 'message' in newAssignment) {
            return { message: newAssignment.message, error: newAssignment.error };
        }
        return newAssignment;
    }

    @UseGuards(AdminJwtAuthGuard)
    @Put('')
    async updateAssignment(assignmentId: string, @Body() assignmentData: Partial<Assignment>) {
        const updatedAssignment = await this.assignmentService.updateAssignment(assignmentId, assignmentData);
        if (typeof updatedAssignment === 'object' && 'message' in updatedAssignment) {
            return { message: updatedAssignment.message, error: updatedAssignment.error };
        }
        return updatedAssignment;
    }

    @UseGuards(AdminJwtAuthGuard)
    @Delete('/:id')
    async deleteAssignment(@Param('id') assignmentId: string) {
        const result = await this.assignmentService.deleteAssignment(assignmentId);
        if (typeof result === 'object' && 'message' in result) {
            return { message: result.message, error: result.error };
        }
        return { message: "Assignment deleted successfully" };
    }

}