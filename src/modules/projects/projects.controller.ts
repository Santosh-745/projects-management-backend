import { Controller, Get, Param, Delete, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { createProjectDto, FilterDto, ListProjectsDto } from './dtos';
import { AuthGuard } from '../../guards';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { ICurrentUser } from '../../shared/interfaces';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: createProjectDto, @CurrentUser() user: ICurrentUser) {
    return this.projectsService.create(body, +user?.sub);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query() query: FilterDto, @CurrentUser() user: ICurrentUser): Promise<ListProjectsDto> {
    return this.projectsService.findAll(query, +user?.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.projectsService.findOne(+id, +user?.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.projectsService.remove(+id);
  }
}
