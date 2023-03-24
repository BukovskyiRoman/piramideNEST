import {
    Column,
    Entity,
    PrimaryGeneratedColumn, Timestamp
} from "typeorm";

@Entity('news')
export class News {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id'
    })
    id: number;

    @Column({
        type: 'varchar',
        name: 'title',
        nullable: false
    })
    title: string;

    @Column({
        type: 'varchar',
        name: 'body',
        nullable: false
    })
    body: string;

    @Column({
        type: "varchar",
        name: "href",
        nullable: false
    })
    href: string;

    @Column({
        type: "varchar",
        name: "source",
        nullable: false
    })
    source: string;

    @Column({
        type: "bigint",
        name: "date",
        nullable: false,
    })
    date: bigint
}
