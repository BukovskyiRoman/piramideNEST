"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersTableCreate1676631033619 = void 0;
const typeorm_1 = require("typeorm");
const role_enum_1 = require("../../enum/role.enum");
class UsersTableCreate1676631033619 {
    async up(queryRunner) {
        await queryRunner.createTable((new typeorm_1.Table({
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
                    enum: [role_enum_1.Role.User, role_enum_1.Role.Admin, role_enum_1.Role.Investor],
                    enumName: 'rolesEnum',
                    default: `'${role_enum_1.Role.User}'`,
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
        })));
        await queryRunner.createForeignKey("user", new typeorm_1.TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            name: 'FK_User_User'
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("user");
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("user", foreignKey);
        await queryRunner.dropColumn("user", "user_id");
        await queryRunner.dropTable("user");
    }
}
exports.UsersTableCreate1676631033619 = UsersTableCreate1676631033619;
//# sourceMappingURL=1676631033619-UsersTableCreate.js.map