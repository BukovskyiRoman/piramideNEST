"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitesTableCreate1676632760965 = void 0;
const typeorm_1 = require("typeorm");
class InvitesTableCreate1676632760965 {
    async up(queryRunner) {
        await queryRunner.createTable((new typeorm_1.Table({
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
        })));
        await queryRunner.createForeignKey("invite", new typeorm_1.TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            name: 'FK_Invite_User'
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("invite");
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("invite", foreignKey);
        await queryRunner.dropColumn("invite", "user_id");
        await queryRunner.dropTable("invite");
    }
}
exports.InvitesTableCreate1676632760965 = InvitesTableCreate1676632760965;
//# sourceMappingURL=1676632760965-InvitesTableCreate.js.map