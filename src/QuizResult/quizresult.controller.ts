import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { QuizResultService } from "./quizresult.service";
import { QuestionResponseDto } from "src/database/models/quizresult.schema";
import { UserJwtAuthGuard } from "src/Guards/jwt-user-auth.guard";
import { AdminJwtAuthGuard } from "src/Guards/jwt-auth.guard";

@Controller('quizresult')
export class QuizResultController {
    constructor(private quizResultService: QuizResultService) {}

    @UseGuards(UserJwtAuthGuard)
    @Get('scorecard/:studentId')
    async getAllQuizResults(@Param('studentId') studentId: string) {
        const quizResults = await this.quizResultService.getStudentScoreCardDetails(studentId);
        return quizResults;
    }

    @UseGuards(AdminJwtAuthGuard)
    @Get('admin/scorecard/:studentId')
    async getAllQuizResultsAdmin(@Param('studentId') studentId: string) {
        const quizResults = await this.quizResultService.getStudentScoreCardDetails(studentId);
        return quizResults;
    }

    @UseGuards(UserJwtAuthGuard)
    @Get('leaderboard/:courseId')
    async getLeaderboard(@Param('courseId') courseId: string) {
        console.log("courseID:", courseId);
        const leaderboard = await this.quizResultService.getLeaderboardByCourseId(courseId);
        return leaderboard;
    }

    @UseGuards(AdminJwtAuthGuard)
    @Get('admin/leaderboard/:courseId')
    async getLeaderboardAdmin(@Param('courseId') courseId: string) {
        const leaderboard = await this.quizResultService.getLeaderboardByCourseId(courseId);
        return leaderboard;
    }

    @UseGuards(UserJwtAuthGuard)
    @Get(':quizId/:studentId')
    async getQuizResult(@Param('quizId') quizId: string, @Param('studentId') studentId: string) {
        const quizResult = await this.quizResultService.getQuizResultById(quizId, studentId);
        return quizResult;
    }

    @UseGuards(UserJwtAuthGuard)
    @Post(':quizId/:studentId')
    async createQuizResult(@Param('quizId') quizId: string, @Param('studentId') studentId: string) {
        const quizResult = await this.quizResultService.createQuizResult(quizId, studentId);
        return quizResult;
    }

    @UseGuards(UserJwtAuthGuard)
    @Put(':quizId/:studentId')
    async updateQuizResult(@Param('quizId') quizId: string, @Param('studentId') studentId: string, @Body() body: QuestionResponseDto) {
        const quizResult = await this.quizResultService.updateQuizResult(quizId, studentId, body);
        return quizResult;
    }

}