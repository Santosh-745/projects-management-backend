import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "../entities";
import { Repository } from "typeorm";

export class DepartmentsRepository extends Repository<Department> {
    constructor(
        @InjectRepository(Department) 
        private departmentsRepository: Repository<Department>,
    ) {
        super(
            departmentsRepository.target,
            departmentsRepository.manager,
            departmentsRepository.queryRunner,
        );
    }

    async get(id: number) {
        return this.departmentsRepository.findOneBy({ id });
    }

    async getAllWithBudgetPercentage(projectId: number) {
        return this.departmentsRepository.query(`
            select 
                d.id,
                d.name,
                sum(po.budget)::decimal / (sum(po.budget) over())::decimal * 100
            from "department" d
            left join "position" po on d.id = po."departmentId" 
            left join "project" p on po."projectId" = p.id
            where p.id = ${projectId}
            group by d.id, po.budget
        `);
    }
}