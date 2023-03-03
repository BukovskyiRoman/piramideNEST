import {
    AfterInsert,
    BeforeInsert, BeforeUpdate,
    Column,
    Entity,
    JoinColumn, ManyToOne, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Role } from "../../enum/role.enum";
import { Invite } from "../invite/invite.entity";
import { Transaction } from "../transaction/transaction.entity";
import * as bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id'
    })
    id: number;
    @Column({
        type: 'varchar',
        name: 'first_name',
        nullable: false
    })
    first_name: string;
    @Column({
        type: "varchar",
        name: 'last_name',
        nullable: false
    })
    last_name: string;

    @Exclude({ toPlainOnly: true })
    @Column({
        type: 'varchar',
        name: 'password',
        nullable: false,
        select: false
    })
    password: string;

    @Column({
        type: "varchar",
        name: "email",
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        type: "numeric",
        name: "balance",
        default: 0
    })
    balance: number;

    @Column({
        type: "text",
        name: "roles",
        default: Role.User
    })
    roles: Role

    @ManyToOne(() => User, {
        nullable: true
    })
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    inviter: User

    @OneToMany(() => Invite, (invite) => invite.user, {
        nullable: true
    })
    @JoinColumn()
    invites: Invite[]

    @OneToMany(() => Transaction, ({ user }) => user )
    transactions: Transaction[]

}
