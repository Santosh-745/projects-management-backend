import { Injectable } from "@nestjs/common";
import { DesignationsRepository } from "./repositories";

@Injectable()
export class DesignationsService {
    constructor(
        private readonly designationsRepository: DesignationsRepository
    ) { }
    async findAll() {
        return this.designationsRepository.find();
    }
}