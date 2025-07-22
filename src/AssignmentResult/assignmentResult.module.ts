import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignmentResultService } from './assignmentResult.service';
import { AssignmentResultController } from './assignmentResult.controller';
import { AssignmentResult, AssignmentResultSchema } from 'src/database/models/assignmentResult.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AssignmentResult.name, schema: AssignmentResultSchema },
    ]),
  ],
  controllers: [AssignmentResultController],
  providers: [AssignmentResultService],
  exports: [AssignmentResultService],
})
export class AssignmentResultModule {}