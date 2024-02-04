import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 30, nullable: true})
    name: string;

    @Column({type: 'varchar', length: 15, nullable: true})
    username: string;

    @Column({type: 'varchar', length: 40})
    email: string

    @Column({type: 'int', nullable: true})
    age: number

    @Column({type: 'varchar'})
    @Exclude()
    password: string;

    @Column({type: 'enum', enum: ['m', 'f', 'u'], nullable: true})
    gender: string;
    length: any;


}
