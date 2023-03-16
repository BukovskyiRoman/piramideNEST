import { IsNumber, Min } from 'class-validator';

export class adminMoneyBody {
  @IsNumber()
  @Min(1)
  money: number;
}
