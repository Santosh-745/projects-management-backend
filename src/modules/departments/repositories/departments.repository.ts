import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "../entities";
import { Repository } from "typeorm";

export class DepartmentsRepository extends Repository<Department> {
    constructor(
        @InjectRepository(Department) 
        private departmentRepository: Repository<Department>,
    ) {
        super(
            departmentRepository.target,
            departmentRepository.manager,
            departmentRepository.queryRunner,
        );
    }

    async get(id: number) {
        return this.departmentRepository.findOneBy({ id });
    }
}