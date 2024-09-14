import { InjectRepository } from "@nestjs/typeorm";
import { Designation } from "../entities";
import { Repository } from "typeorm";

export class DesignationsRepository extends Repository<Designation> {
    constructor(
        @InjectRepository(Designation) 
        private designationsRepository: Repository<Designation>,
    ) {
        super(
            designationsRepository.target,
            designationsRepository.manager,
            designationsRepository.queryRunner,
        );
    }

    async get(id: number) {
        return this.designationsRepository.findOneBy({ id });
    }
}