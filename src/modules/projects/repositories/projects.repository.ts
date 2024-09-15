import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../entities";
import { Repository } from "typeorm";
import { FilterDto } from "../dtos";

export class ProjectsRepository extends Repository<Project> {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) {
        super(
            projectRepository.target,
            projectRepository.manager,
            projectRepository.queryRunner,
        );
    }

    async getAll(userId: number, filter: FilterDto) {
        return this.projectRepository.query(`
            with ctx as (
                select 
                    p.*,
                    json_agg(
                        json_build_object(
                            'id', u2.id,
                            'name', CONCAT(u2."firstName", ' ', u2."lastName")
                        )
                    ) FILTER (WHERE u2.id != ${userId}) AS "coplanners",
                    count(pos.id) as "noOfPositions",
                    sum(pos.budget) as "usedBudget"
                from 
                    "project" p
                left join 
                    "project_users_user" pu on p.id = pu."projectId"
                left join
                    "user" u2 on pu."userId" = u2.id
                left join 
                    "position" pos on p.id = pos."projectId"
                left join 
                    "department" d on pos."departmentId" = d."id"
                group by
                    p.id
            )
            select 
                ctx.*,
                count(ctx.id) OVER() as "totalCount"
            from 
                ctx
            left join 
                "project_users_user" pu on ctx.id = pu."projectId"
            left join
                "user" u on pu."userId" = u.id
            where
                u.id = ${userId}
            limit ${filter?.limit} offset ${(filter?.page - 1) * filter?.limit}
        `);
    }

    async store(body: Partial<Project>) {
        const newProject = this.projectRepository.create(body);
        return this.projectRepository.save(newProject);
    }
}