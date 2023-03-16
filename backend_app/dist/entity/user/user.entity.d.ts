import { Role } from "../../enum/role.enum";
import { Invite } from "../invite/invite.entity";
import { Transaction } from "../transaction/transaction.entity";
export declare class User {
    id: number;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    balance: number;
    roles: Role;
    inviter: User;
    invites: Invite[];
    transactions: Transaction[];
}
