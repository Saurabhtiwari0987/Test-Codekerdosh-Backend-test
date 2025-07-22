import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../database/models/course.schema';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  providers: [PolicyService],
  controllers: [PolicyController],
})
export class PolicyModule {}
