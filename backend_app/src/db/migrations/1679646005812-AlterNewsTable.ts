import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterNewsTable1679646005812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('news', 'date', new TableColumn({
            isNullable: false,
            type: "bigInt",
            name: 'date'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('news', 'date', new TableColumn({
            isNullable: false,
            type: "varchar",
            name: 'date'
        }))
    }

}
