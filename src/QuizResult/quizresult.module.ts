import { Module } from "@nestjs/common";
import { QuizResultController } from "./quizresult.controller";
import { QuizResultService } from "./quizresult.service";
import { MongooseModule } from "@nestjs/mongoose";
import { QuizResult, QuizResultSchema } from "src/database/models/quizresult.schema";
import { Question, QuestionSchema } from "src/database/models/question.schema";
import { User, UserSchema } from "src/database/models/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: QuizResult.name, schema: QuizResultSchema },
            { name: Question.name, schema: QuestionSchema },
            { name: User.name, schema: UserSchema }
    ])],
    controllers: [QuizResultController],
    providers: [QuizResultService],
})
export class QuizResultModule {}