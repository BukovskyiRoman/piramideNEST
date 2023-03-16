import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class TransactionsTableCreate1676632239382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable((
            new Table({
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
            })
        ), true)
        await queryRunner.createForeignKey(
            "transaction",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                name: 'FK_Transaction_User'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("transaction")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("user_id") !== -1,
        )
        await queryRunner.dropForeignKey("transaction", foreignKey)
        await queryRunner.dropColumn("transaction", "user_id")
        await queryRunner.dropTable("transaction")
    }

}
