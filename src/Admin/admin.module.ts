import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Admin, AdminSchema } from "src/database/models/admin.schema";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
    imports: [
        JwtModule.register({
              secret: 'your_secret_key',
              signOptions: { expiresIn: '1h' },
            }),
            MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    ],
    controllers: [AdminController],
    providers: [AdminService, JwtService],
})
export class AdminModule {}