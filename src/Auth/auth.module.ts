import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/database/models/user.schema';
import { UserJwtAuthGuard } from '../Guards/jwt-user-auth.guard';
import { PaymentHistory, PaymentHistorySchema } from 'src/database/models/payment-history.schema';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: PaymentHistory.name, schema: PaymentHistorySchema }]),


  ],
  providers: [AuthService, GoogleStrategy, JwtService, UserJwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}