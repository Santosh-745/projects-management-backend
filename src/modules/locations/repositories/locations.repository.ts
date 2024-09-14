import { InjectRepository } from "@nestjs/typeorm";
import { Location } from "../entities";
import { Repository } from "typeorm";

export class LocationsRepository extends Repository<Location> {
    constructor(
        @InjectRepository(Location)
        private locationsRepository: Repository<Location>,
    ) {
        super(
            locationsRepository.target,
            locationsRepository.manager,
            locationsRepository.queryRunner,
        );
    }

    async get(id: number) {
        return this.locationsRepository.findOneBy({ id });
    }
}