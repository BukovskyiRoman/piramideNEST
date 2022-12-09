import { Test, TestingModule } from "@nestjs/testing";
import { TransactionService } from "./transaction.service";
import { Transaction, TransactionDocument } from "./transaction.schema";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";

describe("TransactionService", () => {
    let service: TransactionService;
    let mockTransactionModel: Model<TransactionDocument>;

    let mockModel = {
        getTransactions: jest.fn(() => {
            return [
                {},
                {}
            ];
        }),
        createTransaction: jest.fn().mockImplementation(dto => {
            return dto;
        }),
        save: jest.fn().mockImplementation(transaction => Promise.resolve({ id: Date.now(), ...transaction }))
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getModelToken(Transaction.name),
                    useValue: mockModel
                },
                TransactionService
            ]
        }).compile();

        service = module.get<TransactionService>(TransactionService);
        //mockTransactionModel = module.get<Model<TransactionDocument>>(getModelToken(Transaction.name));
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    describe("Transactions", () => {
        it("should be array of transactions", async () => {

        });

        it("should create a transaction", async () => {
            expect(service.createTransaction({
                sum: 15, isPercentage: false, user: null
            }));
        });
    });


});
