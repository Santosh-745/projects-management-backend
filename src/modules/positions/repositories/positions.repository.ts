import { InjectRepository } from "@nestjs/typeorm";
import { Position } from "../entities";
import { ILike, Repository } from "typeorm";
import { CreatePositionDto, FilterDto } from "../dtos";

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

    async getAll(projectId: number, filter: FilterDto) {
        const positionQuery = this.positionRepository
            .createQueryBuilder('position')
            .leftJoinAndSelect('position.departmentId', 'department')
            .leftJoinAndSelect('position.designationId', 'designation')
            .leftJoinAndSelect('position.locationId', 'location')
            .leftJoinAndSelect('position.updatedBy', 'updatedBy')
            .andWhere('position.projectId = :projectId', { projectId });

        if (filter?.search) {
            positionQuery.andWhere('department.name ILIKE :search OR designation.title ILIKE :search', 
                { search: `%${filter.search}%` }
            );
        }
        if (filter?.filterField && filter?.filterValue) {
            positionQuery.andWhere(`position.${filter.filterField} = :filterValue`, {
                filterValue: `${filter.filterValue}`,
            });
        }
        return positionQuery
            .skip((filter.page - 1) * filter.limit)
            .take(filter.limit)
            .getManyAndCount();
    }

    async get(id: number) {
        return this.positionRepository.findOneBy({ id });
    }

    async delete(id: number) {
        return this.positionRepository.delete({ id });
    }
}