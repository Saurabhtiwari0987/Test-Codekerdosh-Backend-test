import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Orders } from 'razorpay/dist/types/orders';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-order')
  async createOrder(
    @Body()
    data: {
      order: Orders.RazorpayOrderCreateRequestBody;
      user_id: string;
      course_id: string;
    },
  ) {
    const order = await this.paymentService.createOrder(
      data.order,
      data.user_id,
      data.course_id,
    );
    return {
      order,
      message: 'Order created successfully',
    };
  }

  @Post('verify-payment')
  async verifyPayment(@Body() data: any) {
    const response = await this.paymentService.verifyPayment(data);
    return response;
  }
}
