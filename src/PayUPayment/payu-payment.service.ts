import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders } from 'razorpay/dist/types/orders';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
import { Payment, PaymentDocument } from 'src/database/models/payment.schema';

export interface IPayUBody {
  txnid: string;
  amount: number;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const PayU = require('payu-websdk');

@Injectable()
export class PayUPaymentService {

  payuClient = new PayU(
    {
      key: 'sccfEJ',
      salt: 'jr1WaxCWQSDM8sjvxko1iku09WhBIDhF',
    },
    'PROD',
  );

  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async createOrder(order: IPayUBody, user_id: string, course_id: string) {
    // append txnid to the order success and failure urls
    order.surl = order.surl + `?txnid=${order.txnid}`;

    const createdOrder = await this.payuClient.paymentInitiate(order);

    // Save the order to the database
    const payment = new this.paymentModel({
      order_id: order.txnid,
      amount: Number(order.amount),
      currency: 'INR',
      receipt: order.txnid,
      status: 'attempted',
      payment_id: '',
      user_id: user_id,
      course_id: course_id,
    });

    await payment.save();

    return createdOrder;
  }

  async verifyPayment(data: any) {
    const { txnid } = data;

    try {
      const transactionVerifyData = await this.payuClient.verifyPayment(txnid);
      console.log(transactionVerifyData);
      if (transactionVerifyData?.status === 1 && transactionVerifyData?.transaction_details?.bank_ref_num) {
        // Update the order with payment details

        await this.paymentModel.findOneAndUpdate(
          {
            order_id: txnid,
          },
          { status: 'paid', payment_id: transactionVerifyData.transaction_details?.bank_ref_num },
        );

        return { status: 'ok' };
      } else {
        await this.paymentModel.findOneAndUpdate(
          {
            order_id: txnid,
          },
          { status: 'attempted', payment_id: txnid },
        );

        return { status: 'verification_failed' };
      }
    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'Error verifying payment' };
    }
  }
}
