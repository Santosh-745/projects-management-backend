import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities';
import { ProjectRepository } from './repositories';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectRepository],
  imports: [TypeOrmModule.forFeature([Project]), UsersModule],
  exports: [ProjectsService, TypeOrmModule, ProjectRepository],
})
export class ProjectsModule {}
