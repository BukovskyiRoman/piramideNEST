import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { Role } from "../../enum/role.enum";

export class UsersTableCreate1676631033619 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable((
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        type: "varchar",
                        name: "password",
                        isNullable: false
                    },
                    {
                        type: "numeric",
                        name: "balance",
                        default: 0
                    },
                    {
                        name: "roles",
                        type: "enum",
                        enum: [Role.User, Role.Admin, Role.Investor],
                        enumName: 'rolesEnum',
                        default: `'${Role.User}'`,
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
            "user",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                name: 'FK_User_User'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("user")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("user_id") !== -1,
        )
        await queryRunner.dropForeignKey("user", foreignKey)
        await queryRunner.dropColumn("user", "user_id")
        await queryRunner.dropTable("user")
    }

}
