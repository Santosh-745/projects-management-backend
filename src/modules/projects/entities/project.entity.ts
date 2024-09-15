import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities";
import { Position } from "../../positions/entities";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    budget?: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'adminId', referencedColumnName: 'id' })
    admin: User;

    @ManyToMany(() => User, user => user.projects)
    @JoinTable()
    users: User[];

    @OneToMany(() => Position, position => position.project)
    positions: Position[];
}
