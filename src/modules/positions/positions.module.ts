import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities';
import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';
import { PositionRepository } from './repositories';
import { DesignationsModule } from '../designations/designations.module';
import { DepartmentsModule } from '../departments/departments.module';
import { LocationsModule } from '../locations/locations.module';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Position]),
    DesignationsModule,
    DepartmentsModule,
    LocationsModule,
    UsersModule,
    ProjectsModule
  ],
  controllers: [PositionsController],
  providers: [PositionsService, PositionRepository],
  exports: [PositionsService, TypeOrmModule],
})
export class PositionsModule {}
