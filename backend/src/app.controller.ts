import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { Payment } from './app.dto';

@Controller('/payment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  payment(@Body() paymentDto: Payment): string {
    console.log(paymentDto.status);
    // raise a status code 401 error if status is 401
    if (paymentDto.status === '401') {
      throw new UnauthorizedException();
    }

    if (paymentDto.status === '500') {
      throw new Error('Internal Server Error');
    }

    return this.appService.storePayment();
  }
}
