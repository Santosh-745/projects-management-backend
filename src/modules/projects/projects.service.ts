import { Injectable, NotFoundException } from '@nestjs/common';
import { createProjectDto, FilterDto, ListProjectsDto } from './dtos';
import { ProjectsRepository } from './repositories';
import { UserRepository } from '../users/repositories';
import { In } from 'typeorm';
import { User } from '../users/entities';
import * as _ from 'lodash';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly userRepository: UserRepository
  ) {}
  async create(createProjectDto: createProjectDto, adminId: number) {
    // add admin as coplanner & remove duplicates
    createProjectDto.users.push(adminId);
    createProjectDto.users = _.uniq(createProjectDto.users);

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
    const payload = { 
      ...createProjectDto,
      users,
      admin,
      budget: createProjectDto?.budget || 0
    };
    return this.projectsRepository.store(payload);
  }

  async findAll(query: FilterDto, userId: number): Promise<ListProjectsDto> {
    // fetch projects
    query.page = query?.page || 1;
    query.limit = query?.limit || 50;
    const projects = await this.projectsRepository.getAll(userId, query);
    
    // prepare & return response
    return {
      projects: projects,
      page: +query.page,
      length: projects?.length,
      total: +projects[0]?.totalCount,
      totalPages: Math.ceil(projects[0]?.totalCount / query.limit),
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
