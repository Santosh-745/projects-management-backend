import { InjectRepository } from "@nestjs/typeorm";
import { Position } from "../entities";
import { Repository } from "typeorm";
import { CreatePositionDto } from "../dtos";

export class PositionRepository extends Repository<Position> {
    constructor(
        @InjectRepository(Position) 
        private positionRepository: Repository<Position>,
    ) {
        super(
            positionRepository.target,
            positionRepository.manager,
            positionRepository.queryRunner,
        );
    }

    async store(body: Partial<Position>) {
        const newPosition = this.positionRepository.create(body);
        return this.positionRepository.save(newPosition);
    }

    async getAll() {
        return this.positionRepository.find({
            relations: ['departmentId', 'designationId', 'locationId', 'updatedBy'],
        });
    }

    async get(id: number) {
        return this.positionRepository.findOneBy({ id });
    }

    async delete(id: number) {
        return this.positionRepository.delete({ id });
    }
}