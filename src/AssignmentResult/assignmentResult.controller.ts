import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AssignmentResultService } from './assignmentResult.service';
import { AssignmentResult } from 'src/database/models/assignmentResult.schema';
import { AdminJwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { UserJwtAuthGuard } from 'src/Guards/jwt-user-auth.guard';
import { IEvaluatorRequest, IStudentRequest } from './assignmentResult.dto';
import { EvaluatorJwtAuthGuard } from 'src/Guards/jwt-auth-evaluator.guard';

@Controller('assignment-result')
export class AssignmentResultController {
  constructor(
    private readonly assignmentResultService: AssignmentResultService,
  ) {}

  @Post()
  @UseGuards(UserJwtAuthGuard)
  async create(@Body() data: IStudentRequest) {
    try {
      const result =
        await this.assignmentResultService.createAssignmentResult(data);
      return {
        success: true,
        message: 'Assignment result created successfully',
        data: result,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get()
  @UseGuards(AdminJwtAuthGuard)
  async findAll() {
    try {
      const results =
        await this.assignmentResultService.getAllAssignmentResults();
      return { success: true, data: results };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get('/evaluator')
  @UseGuards(EvaluatorJwtAuthGuard)
  async findAllForEvaluator() {
    try {
      const results =
        await this.assignmentResultService.getAllAssignmentResults();
      return { success: true, data: results };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get('student/:studentId')
  @UseGuards(UserJwtAuthGuard)
  async findAllForStudent(@Param('studentId') studentId: string) {
    try {
      const results =
        await this.assignmentResultService.getAllAssignmentResultsForStudentId(
          studentId,
        );
      return { success: true, data: results };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get('evaluator/:assignmentResultId')
  @UseGuards(EvaluatorJwtAuthGuard)
  async findOneforEvaluator(
    @Param('assignmentResultId') assignmentResultId: string,
  ) {
    try {
      const result =
        await this.assignmentResultService.getAssignmentResultByIdEvaluator(
          assignmentResultId,
        );
      if (!result) {
        return { success: false, message: 'Assignment result not found' };
      }
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get(':studentId/:assignmentId')
  @UseGuards(AdminJwtAuthGuard)
  async findOne(
    @Param('studentId') studentId: string,
    @Param('assignmentId') assignmentId: string,
  ) {
    try {
      const result = await this.assignmentResultService.getAssignmentResultById(
        studentId,
        assignmentId,
      );
      if (!result) {
        return { success: false, message: 'Assignment result not found' };
      }
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get('student/:studentId/:assignmentId')
  @UseGuards(UserJwtAuthGuard)
  async findOneForStudent(
    @Param('studentId') studentId: string,
    @Param('assignmentId') assignmentId: string,
  ) {
    try {
      const result = await this.assignmentResultService.getAssignmentResultById(
        studentId,
        assignmentId,
      );
      if (!result) {
        return { success: false, message: 'Assignment result not found' };
      }
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Put(':id')
  @UseGuards(AdminJwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() update: Partial<AssignmentResult>,
  ) {
    try {
      const result = await this.assignmentResultService.updateAssignmentResult(
        id,
        update,
      );
      if (!result) {
        return {
          success: false,
          message: 'Assignment result not found or not updated',
        };
      }
      return {
        success: true,
        message: 'Assignment result updated successfully',
        data: result,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Put('student/:id')
  @UseGuards(UserJwtAuthGuard)
  async updateByStudent(
    @Param('id') id: string,
    @Body() update: IStudentRequest,
  ) {
    try {
      const result =
        await this.assignmentResultService.updateAssignmentResultByStudent(
          id,
          update,
        );
      if (!result) {
        return {
          success: false,
          message: 'Assignment result not found or not updated',
        };
      }
      return {
        success: true,
        message: 'Assignment result updated successfully',
        data: result,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Put('evaluator/:id')
  @UseGuards(EvaluatorJwtAuthGuard)
  async updateByEvaluator(
    @Param('id') id: string,
    @Body() update: IEvaluatorRequest,
  ) {
    try {
      const result =
        await this.assignmentResultService.updateAssignmentResultByEvaluator(
          id,
          update,
        );
      if (!result) {
        return {
          success: false,
          message: 'Assignment result not found or not updated',
        };
      }
      return {
        success: true,
        message: 'Assignment result updated successfully',
        data: result,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Delete(':id')
  @UseGuards(AdminJwtAuthGuard)
  async remove(@Param('id') id: string) {
    try {
      const result =
        await this.assignmentResultService.deleteAssignmentResult(id);
      if (!result) {
        return {
          success: false,
          message: 'Assignment result not found or already deleted',
        };
      }
      return {
        success: true,
        message: 'Assignment result deleted successfully',
        data: result,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
