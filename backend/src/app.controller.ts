import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Payment } from './app.dto';

@Controller('/payment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  payment(@Body() paymentDto: Payment): string {
    return this.appService.storePayment();
  }
}
