"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsTableCreate1676632239382 = void 0;
const typeorm_1 = require("typeorm");
class TransactionsTableCreate1676632239382 {
    async up(queryRunner) {
        await queryRunner.createTable((new typeorm_1.Table({
            name: "transaction",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    type: 'numeric',
                    name: 'sum',
                    isNullable: false
                },
                {
                    name: "isPercentage",
                    type: "boolean",
                    default: false
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
            ]
        })), true);
        await queryRunner.createForeignKey("transaction", new typeorm_1.TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            name: 'FK_Transaction_User'
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("transaction");
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("transaction", foreignKey);
        await queryRunner.dropColumn("transaction", "user_id");
        await queryRunner.dropTable("transaction");
    }
}
exports.TransactionsTableCreate1676632239382 = TransactionsTableCreate1676632239382;
//# sourceMappingURL=1676632239382-TransactionsTableCreate.js.map