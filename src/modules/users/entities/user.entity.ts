import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../projects/entities";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Project, project => project.users)
    projects: Project[];
}
