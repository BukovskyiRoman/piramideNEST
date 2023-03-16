import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('transaction')
@ApiTags('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}
  @Get()
  async getTransactions() {
    return await this.transactionService.getTransactions();
  }
}
