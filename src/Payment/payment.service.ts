import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders } from 'razorpay/dist/types/orders';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
import { Payment, PaymentDocument } from 'src/database/models/payment.schema';

@Injectable()
export class PaymentService {
  private readonly razorpay: any;

  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async createOrder(
    order: Orders.RazorpayOrderCreateRequestBody,
    user_id: string,
    course_id: string,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Razorpay = require('razorpay');

    const razorpay = new Razorpay({
      key_id: 'rzp_live_BuMv1StsuJoNWq',
      key_secret: 'MtNAoAN44jV2AvyUrhyNpjsl',
      // headers: {},
    });

    const createdOrder = await razorpay.orders.create(order);

    // Save the order to the database
    const payment = new this.paymentModel({
      order_id: createdOrder.id,
      amount: Number(createdOrder.amount),
      currency: createdOrder.currency,
      receipt: createdOrder.receipt,
      status: createdOrder.status,
      payment_id: '',
      user_id: user_id,
      course_id: course_id,
    });

    await payment.save();

    return createdOrder;
  }

  async verifyPayment(data: any) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    const secret = 'MtNAoAN44jV2AvyUrhyNpjsl';
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    try {
      const isValidSignature = validateWebhookSignature(
        body,
        razorpay_signature,
        secret,
      );
      if (isValidSignature) {
        // Update the order with payment details

        await this.paymentModel.findOneAndUpdate(
          {
            order_id: razorpay_order_id,
          },
          { status: 'paid', payment_id: razorpay_payment_id },
        );

        return { status: 'ok' };
      } else {
        await this.paymentModel.findOneAndUpdate(
          {
            order_id: razorpay_order_id,
          },
          { status: 'attempted', payment_id: razorpay_payment_id },
        );

        return { status: 'verification_failed' };
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Error verifying payment' };
    }
  }
}
