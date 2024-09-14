import { Injectable } from "@nestjs/common";
import { LocationsRepository } from "./repositories";

@Injectable()
export class LocationsService {
    constructor(
        private readonly locationsRepository: LocationsRepository
    ) { }
    async findAll() {
        return this.locationsRepository.find();
    }
}