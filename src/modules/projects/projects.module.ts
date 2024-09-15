import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities';
import { ProjectsRepository } from './repositories';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository],
  imports: [TypeOrmModule.forFeature([Project]), UsersModule],
  exports: [ProjectsService, TypeOrmModule, ProjectsRepository],
})
export class ProjectsModule {}
