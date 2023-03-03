import {
    Column,
    Entity,
    JoinColumn, ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Role } from "../../enum/role.enum";
import { User } from "../user/user.entity";


@Entity('invite')
export class Invite {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id'
    })
    id: number;
    @Column({
        type: 'varchar',
        name: 'email',
        nullable: false
    })
    email: string;

    @Column({
        type: "boolean",
        name: "accepted",
        default: false
    })
    accepted: boolean;

    @Column({
        type: "varchar",
        name: "token"
    })
    token: string;

    @ManyToOne(() => User, (user) => user.invites)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_Invite_User'})
    user: User

}
