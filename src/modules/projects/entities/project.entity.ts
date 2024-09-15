import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'adminId', referencedColumnName: 'id' })
    admin: User;

    @ManyToMany(() => User, user => user.projects)
    @JoinTable()
    users: User[];
}
