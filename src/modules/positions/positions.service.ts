import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePositionDto } from './dtos';
import { PositionRepository } from './repositories';
import { DepartmentsRepository } from '../departments/repositories';
import { DesignationsRepository } from '../designations/repositories';
import { LocationsRepository } from '../locations/repositories';
import { UserRepository } from '../users/repositories';

@Injectable()
export class PositionsService {
  constructor(
    private readonly positionRepository: PositionRepository,
    private readonly departmentsRepository: DepartmentsRepository,
    private readonly designationsRepository: DesignationsRepository,
    private readonly locationsRepository: LocationsRepository,
    private readonly usersRepository: UserRepository,
  ) { }
  async create(createPositionDto: CreatePositionDto, userId: number) {
    const department = await this.departmentsRepository.get(createPositionDto.departmentId);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    const designation = await this.designationsRepository.get(createPositionDto.designationId);
    if (!designation) {
      throw new NotFoundException('Designation not found');
    }
    const location = await this.locationsRepository.get(createPositionDto.locationId);
    if (!location) {
      throw new NotFoundException('Locaiton not found');
    }
    const user = await this.usersRepository.get(userId);
    const payload = {
      budget: createPositionDto?.budget,
      designazioneId: designation,
      departmentId: department,
      locationId: location,
      updatedAt: new Date(),
      updatedBy: user
    };
    return this.positionRepository.store(payload);
  }

  findAll() {
    return this.positionRepository.getAll();
  }

  delete(id: number) {
    const position = this.positionRepository.get(id);
    if (!position) {
      throw new NotFoundException('Position not found');
    }
    return this.positionRepository.delete(id);
  }
}
