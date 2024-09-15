import { Project } from "../entities";

export class ListProjectsDto {
    page: number;
    length: number;
    total: number;
    totalPages: number;
    projects: Project[];
}