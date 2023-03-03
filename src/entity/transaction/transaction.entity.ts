import {
    Column,
    Entity, JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { User } from "../user/user.entity";


@Entity('transaction')
export class Transaction {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id'
    })
    id: number;
    @Column({
        type: 'numeric',
        name: 'sum',
        nullable: false
    })
    sum: number;

    @Column({
        name: "isPercentage",
        type: "boolean",
        default: false
    })
    isPercentage: boolean;

    @ManyToOne(() => User, (user) => user.transactions, {
        nullable: false
    })
    @JoinColumn({name: 'user_id', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_Transaction_User'})
    user: User

}
