import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../entities";
import { Repository } from "typeorm";
import { FilterDto } from "../dtos";

export class ProjectRepository extends Repository<Project> {
    constructor(
        @InjectRepository(Project)
        private ProjectRepository: Repository<Project>,
    ) {
        super(
            ProjectRepository.target,
            ProjectRepository.manager,
            ProjectRepository.queryRunner,
        );
    }

    async getAll(userId: number, filter: FilterDto) {
        return this.ProjectRepository.findAndCount({
            where: [
                {
                    admin: { id: userId },
                },
                {
                    users: { id: userId },
                }
            ],
            skip: (filter?.page - 1) * filter?.limit,
            take: filter?.limit,
        });
    }

    async get(id: number, userId: number) {
        return this.ProjectRepository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.admin', 'admin')
            .leftJoinAndSelect('project.users', 'users')
            .andWhere('project.id = :id', { id })
            .andWhere('admin.id = :userId OR users.id = :userId', { userId })
            .execute();
    }

    async store(body: Partial<Project>) {
        const newProject = this.ProjectRepository.create(body);
        return this.ProjectRepository.save(newProject);
    }
}