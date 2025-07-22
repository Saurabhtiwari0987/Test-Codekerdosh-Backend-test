// import { Module } from '@nestjs/common';
// import { AuthService } from './Auth/auth.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import * as dotenv from 'dotenv';
// import { JwtService } from '@nestjs/jwt';
// import { User, UserSchema } from './database/models/user.schema';
// import { Course, CourseSchema } from './database/models/course.schema';
// import { CourseService } from './Course/course.service';
// import { CourseController } from './Course/course.controller';
// import { AuthController } from './Auth/auth.controller';
// import { PolicyService } from './Policy/policy.service';
// import { PolicyController } from './Policy/policy.controller';
// import { PaymentService } from './Payment/payment.service';
// import { PaymentController } from './Payment/payment.controller';
// import { Payment, PaymentSchema } from './database/models/payment.schema';
// import { Admin, AdminSchema } from './database/models/admin.schema';
// import { AdminService } from './Admin/admin.service';
// import { AdminController } from './Admin/admin.controller';
// import { LiveClass, LiveClassSchema } from './database/models/liveClass.schema';
// import { LiveClassService } from './LiveClass/liveClass.service';
// import { LiveClassController } from './LiveClass/liveClass.controller';
// import { PayUPaymentService } from './PayUPayment/payu-payment.service';
// import { PayUPaymentController } from './PayUPayment/payu-payment.controller';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { QuizService } from './Quiz/quiz.service';
// import { QuizController } from './Quiz/quiz.controller';
// import { Quiz, QuizSchema } from './database/models/quiz.schema';
// import { Question, QuestionSchema } from './database/models/question.schema';
// import { QuestionService } from './Question/question.service';
// import { QuestionController } from './Question/question.controller';
// import {
//   QuizResult,
//   QuizResultSchema,
// } from './database/models/quizresult.schema';
// import { QuizResultService } from './QuizResult/quizresult.service';
// import { QuizResultController } from './QuizResult/quizresult.controller';
// import { File, FileSchema } from './database/models/file.schema';
// import { FileService } from './FileUploads/fileuploads.service';
// import { FileController } from './FileUploads/fileuploads.controller';
// import {
//   PaymentHistory,
//   PaymentHistorySchema,
// } from './database/models/payment-history.schema';
// import {
//   Assignment,
//   AssignmentSchema,
// } from './database/models/assignment.schema';
// import { AssignmentService } from './Assignment/assignment.service';
// import { AssignmentController } from './Assignment/assignment.controller';
// import { Notes, NotesSchema } from './database/models/notes.schema';
// import { NotesController } from './notes/notes.controller';
// import { NotesService } from './notes/notes.service';
// import {
//   AssignmentResult,
//   AssignmentResultSchema,
// } from './database/models/assignmentResult.schema';
// import { AssignmentResultService } from './AssignmentResult/assignmentResult.service';
// import { AssignmentResultController } from './AssignmentResult/assignmentResult.controller';
// import { Evaluator, EvaluatorSchema } from './database/models/evaluator.schema';
// import { EvaluatorService } from './Evaluator/evaluator.service';
// import { EvaluatorController } from './Evaluator/evaluator.controller';

// dotenv.config();

// @Module({
//   imports: [
//     MongooseModule.forRoot(
//       `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}`,
//     ),
//     MongooseModule.forFeature([
//       { name: User.name, schema: UserSchema },
//       { name: Course.name, schema: CourseSchema },
//       { name: Payment.name, schema: PaymentSchema },
//       { name: Admin.name, schema: AdminSchema },
//       { name: LiveClass.name, schema: LiveClassSchema },
//       { name: Quiz.name, schema: QuizSchema },
//       { name: Question.name, schema: QuestionSchema },
//       { name: QuizResult.name, schema: QuizResultSchema },
//       { name: File.name, schema: FileSchema },
//       { name: PaymentHistory.name, schema: PaymentHistorySchema },
//       { name: Assignment.name, schema: AssignmentSchema },
//       { name: AssignmentResult.name, schema: AssignmentResultSchema },
//       { name: Notes.name, schema: NotesSchema },
//       { name: Evaluator.name, schema: EvaluatorSchema },
//     ]),
//   ],
//   providers: [
//     AppService,
//     AuthService,
//     JwtService,
//     CourseService,
//     PolicyService,
//     PaymentService,
//     AdminService,
//     LiveClassService,
//     PayUPaymentService,
//     QuizService,
//     QuestionService,
//     QuizResultService,
//     FileService,
//     AssignmentService,
//     NotesService,
//     AssignmentResultService,
//     EvaluatorService,
//   ],
//   controllers: [
//     AppController,
//     CourseController,
//     AuthController,
//     PolicyController,
//     PaymentController,
//     AdminController,
//     LiveClassController,
//     PayUPaymentController,
//     QuizController,
//     QuestionController,
//     QuizResultController,
//     FileController,
//     AssignmentController,
//     NotesController,
//     AssignmentResultController,
//     EvaluatorController,
//   ],
// })
// export class AppModule {}
