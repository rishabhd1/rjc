import { IsNotEmpty, IsNumber } from "class-validator";

export class Payment {
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  description: string;
}