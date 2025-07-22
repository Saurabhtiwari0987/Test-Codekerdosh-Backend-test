import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LiveClass, LiveClassSchema } from "src/database/models/liveClass.schema";
import { LiveClassController } from "./liveClass.controller";
import { LiveClassService } from "./liveClass.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "src/Admin/jwt-strategy-admin";
import { AdminJwtAuthGuard } from "src/Guards/jwt-auth.guard";

@Module({

    imports: [
        MongooseModule.forFeature([{ name: LiveClass.name, schema: LiveClassSchema }]),
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_ADMIN_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [LiveClassController],
    providers: [LiveClassService, AdminJwtAuthGuard,
        JwtStrategy, JwtService],

})
export class LiveClassModule {}