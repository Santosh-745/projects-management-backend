import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePositionDto, FilterDto, ListPositionsResponseDto } from './dtos';
import { PositionRepository } from './repositories';
import { DepartmentsRepository } from '../departments/repositories';
import { DesignationsRepository } from '../designations/repositories';
import { LocationsRepository } from '../locations/repositories';
import { UserRepository } from '../users/repositories';
import { ProjectsRepository } from '../projects/repositories';

@Injectable()
export class PositionsService {
  constructor(
    private readonly positionRepository: PositionRepository,
    private readonly departmentsRepository: DepartmentsRepository,
    private readonly designationsRepository: DesignationsRepository,
    private readonly locationsRepository: LocationsRepository,
    private readonly usersRepository: UserRepository,
    private readonly projectsRepository: ProjectsRepository,
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
    const [project] = await this.projectsRepository.findBy(
      {
        id: createPositionDto.projectId,
        users: {
          id: userId
        }
      }
    )
    if (!project) {
      throw new NotFoundException('Locaiton not found');
    }
    const user = await this.usersRepository.get(userId);
    const payload = {
      project,
      budget: createPositionDto?.budget,
      designation,
      department,
      location,
      updatedAt: new Date(),
      updatedBy: user
    };
    return this.positionRepository.store(payload);
  }

  async findAll(projectId: number, query: FilterDto): Promise<ListPositionsResponseDto> {
    if (query?.filterField && !query?.filterValue) {
      throw new BadRequestException('Filter value is required');
    }
    if (query?.filterValue && !query?.filterField) {
      throw new BadRequestException('Filter field is required');
    }
    query.page = query?.page || 1;
    query.limit = query?.limit || 50;
    const positions = await this.positionRepository.getAll(projectId, query);
    return {
      positions: positions[0],
      page: +query.page,
      length: +positions[0].length,
      total: +positions[1],
      totalPages: Math.ceil(positions[1] / query.limit),
    }
  }

  delete(id: number) {
    const position = this.positionRepository.get(id);
    if (!position) {
      throw new NotFoundException('Position not found');
    }
    return this.positionRepository.delete(id);
  }
}
