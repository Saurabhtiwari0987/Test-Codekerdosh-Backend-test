import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Assignment, AssignmentSchema } from "src/database/models/assignment.schema";
import { AssignmentService } from "./assignment.service";
import { AssignmentController } from "./assignment.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Assignment.name, schema: AssignmentSchema },
    ])],
    controllers: [AssignmentController],
    providers: [AssignmentService],
})
export class AssignmentModule {}