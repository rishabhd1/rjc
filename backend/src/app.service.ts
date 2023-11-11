import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  storePayment(): string {
    return 'Hello World!';
  }
}
