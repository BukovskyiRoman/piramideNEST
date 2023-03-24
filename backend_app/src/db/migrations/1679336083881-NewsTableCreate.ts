import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Role } from "../../enum/role.enum";

export class NewsTableCreate1679336083881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable((
            new Table({
                name: 'news',
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "body",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "href",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        type: "varchar",
                        name: "source",
                        isNullable: false
                    },
                    {
                        name: "date",
                        type: "varchar",
                        isNullable: false
                    }
                ]
            })
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("news")
        await queryRunner.dropTable("news")
    }

}
