import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InvitesTableCreate1676632760965 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable((
            new Table({
                name: "invite",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        type: 'varchar',
                        name: 'email',
                        isNullable: false
                    },
                    {
                        type: "boolean",
                        name: "accepted",
                        default: false
                    },
                    {
                        type: "varchar",
                        name: "token",
                        isNullable: false
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
        ))
        await queryRunner.createForeignKey(
            "invite",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                name: 'FK_Invite_User'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("invite")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("user_id") !== -1,
        )
        await queryRunner.dropForeignKey("invite", foreignKey)
        await queryRunner.dropColumn("invite", "user_id")
        await queryRunner.dropTable("invite")
    }

}
