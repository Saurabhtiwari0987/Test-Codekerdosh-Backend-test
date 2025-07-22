import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "src/database/models/admin.schema";
import { EvaluatorService } from "./evaluator.service";
import { EvaluatorController } from "./evaluator.controller";

@Module({
    imports: [
        JwtModule.register({
              secret: 'your_secret_key',
              signOptions: { expiresIn: '1h' },
            }),
            MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    ],
    controllers: [EvaluatorController],
    providers: [EvaluatorService, JwtService],
})
export class EvaluatorModule {}