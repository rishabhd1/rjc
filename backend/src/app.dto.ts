import { IsNotEmpty, IsNumber } from 'class-validator';

export class Payment {
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  from: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  description: string;

  status!: string;
}
