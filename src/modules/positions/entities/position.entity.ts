import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../projects/entities";
import { Designation } from "../../designations/entities";
import { Department } from "../../departments/entities";
import { Location } from "../../locations/entities";
import { User } from "../../users/entities";

@Entity()
export class Position {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    budget: number;

    @ManyToOne(() => Project)
    @JoinColumn({ name: 'projectId', referencedColumnName: 'id' })
    projectId: Project;

    @ManyToOne(() => Designation)
    @JoinColumn({ name: 'designationId', referencedColumnName: 'id' })
    designationId: Designation;

    @ManyToOne(() => Department)
    @JoinColumn({ name: 'departmentId', referencedColumnName: 'id' })
    departmentId: Department;

    @ManyToOne(() => Location)
    @JoinColumn({ name: 'locationId', referencedColumnName: 'id' })
    locationId: Location;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'updatedBy', referencedColumnName: 'id' })
    updatedBy: User;

    @Column()
    updatedAt: Date;
}   
