import { Body, Controller, Post } from '@nestjs/common';
import { IPayUBody, PayUPaymentService } from './payu-payment.service';

@Controller('payu-payment')
export class PayUPaymentController {
  constructor(private readonly paymentService: PayUPaymentService) {}

  @Post('create-order')
  async createOrder(
    @Body()
    data: {
      order: IPayUBody;
      user_id: string;
      course_id: string;
    },
  ) {
    console.log(data);
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
