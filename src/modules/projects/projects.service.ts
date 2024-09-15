import { Injectable, NotFoundException } from '@nestjs/common';
import { createProjectDto, FilterDto, ListProjectsDto } from './dtos';
import { ProjectRepository } from './repositories';
import { UserRepository } from '../users/repositories';
import { In } from 'typeorm';
import { User } from '../users/entities';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly userRepository: UserRepository
  ) {}
  async create(createProjectDto: createProjectDto, adminId: number) {
    // validate if user exists
    const users = await this.userRepository.findBy({
      id: In(createProjectDto?.users)
    });
    if (users.length !== createProjectDto?.users?.length) {
      throw new NotFoundException('User not found');
    }

    const admin = new User();
    admin.id = adminId;

    // create project
    const payload = { ...createProjectDto, users, admin };
    return this.projectRepository.store(payload);
  }

  async findAll(query: FilterDto, userId: number): Promise<ListProjectsDto> {
    query.page = query?.page || 1;
    query.limit = query?.limit || 50;
    const projects = await this.projectRepository.getAll(userId, query);
    return {
      projects: projects[0],
      page: query.page,
      length: projects[0].length,
      total: projects[1],
      totalPages: Math.ceil(projects[1] / query.limit),
    };
  }

  async findOne(id: number, userId: number) {
    const project = await this.projectRepository.get(id, userId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
