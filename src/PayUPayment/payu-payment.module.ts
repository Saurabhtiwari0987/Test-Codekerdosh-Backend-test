import { Module } from '@nestjs/common';
import { PayUPaymentService } from './payu-payment.service';
import { PayUPaymentController } from './payu-payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from 'src/database/models/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  providers: [PayUPaymentService],
  controllers: [PayUPaymentController],
})
export class PayUPaymentModule {}
