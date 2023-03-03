import { MigrationInterface, QueryRunner } from "typeorm"
import { User } from "../../entity/user/user.entity";
import { Role } from "../../enum/role.enum";
import * as bcrypt from "bcrypt";
import { Transaction } from "../../entity/transaction/transaction.entity";
import { Invite } from "../../entity/invite/invite.entity";

export class AdminUserSeeder1677485204361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(User, [
            {
                first_name: "Admin",
                last_name: "Adminovich",
                email: "adminmail@gmail.com",
                password: await bcrypt.hash("123456789", 10),
                roles: Role.Admin
            }
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const admin = await queryRunner.manager.findOneBy(User, {
            email: "adminmail@gmail.com"
        })
        await queryRunner.manager.delete(Transaction, {
            user: admin
        })
        await queryRunner.manager.delete(Invite, {
            user: admin
        })
        await queryRunner.manager.delete(User, {
            email: "adminmail@gmail.com"
        });
    }

}
