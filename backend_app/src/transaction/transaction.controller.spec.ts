import { Test, TestingModule } from "@nestjs/testing";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { TransactionModule } from "./transaction.module";
import { getModelToken } from "@nestjs/mongoose";
import { Transaction, TransactionDocument } from "./transaction.schema";
import { Model } from "mongoose";
import { CreateTransactionDto } from "./dto/create-transaction.dto";

describe("TransactionController", () => {
    let controller: TransactionController;
    // let service: TransactionService;
    // let mockTransactionModel: Model<TransactionDocument>;

    const mockService = {
        getTransactions: jest.fn( ).mockImplementation( () => {
            return {
                id: 'sfsfsdf',
                sum: 15,
                isPercentage: false,
                ...CreateTransactionDto
            }
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransactionController],
            providers: [
                // {
                //     provide: getModelToken(Transaction.name),
                //     useValue: Model
                // },
                TransactionService,
            ],
        })
            .overrideProvider(TransactionService)
            .useValue(mockService)
            .compile();

        controller = module.get<TransactionController>(TransactionController);
        // service = module.get<TransactionService>(TransactionService);
        // mockTransactionModel = module.get<Model<TransactionDocument>>(getModelToken(Transaction.name));
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should create a transaction", function() {
        expect(controller.getTransactions()).toEqual({
            id: 'sfsfsdf',
            sum: 15,
            isPercentage: false
        });

        expect(mockService.getTransactions).toHaveBeenCalled();
    });
});
