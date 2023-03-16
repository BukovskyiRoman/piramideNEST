"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserSeeder1677485204361 = void 0;
const user_entity_1 = require("../../entity/user/user.entity");
const role_enum_1 = require("../../enum/role.enum");
const bcrypt = require("bcrypt");
const transaction_entity_1 = require("../../entity/transaction/transaction.entity");
const invite_entity_1 = require("../../entity/invite/invite.entity");
class AdminUserSeeder1677485204361 {
    async up(queryRunner) {
        await queryRunner.manager.insert(user_entity_1.User, [
            {
                first_name: "Admin",
                last_name: "Adminovich",
                email: "adminmail@gmail.com",
                password: await bcrypt.hash("123456789", 10),
                roles: role_enum_1.Role.Admin
            }
        ]);
    }
    async down(queryRunner) {
        const admin = await queryRunner.manager.findOneBy(user_entity_1.User, {
            email: "adminmail@gmail.com"
        });
        await queryRunner.manager.delete(transaction_entity_1.Transaction, {
            user: admin
        });
        await queryRunner.manager.delete(invite_entity_1.Invite, {
            user: admin
        });
        await queryRunner.manager.delete(user_entity_1.User, {
            email: "adminmail@gmail.com"
        });
    }
}
exports.AdminUserSeeder1677485204361 = AdminUserSeeder1677485204361;
//# sourceMappingURL=1677485204361-AdminUserSeeder.js.map