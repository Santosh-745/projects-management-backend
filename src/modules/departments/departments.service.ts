import { Injectable } from "@nestjs/common";
import { DepartmentsRepository } from "./repositories";

@Injectable()
export class DepartmentsService {
    constructor(
        private readonly departmentsRepository: DepartmentsRepository
    ) { }
    async findAll() {
        return this.departmentsRepository.find();
    }
}