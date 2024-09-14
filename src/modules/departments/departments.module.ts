import { Module } from "@nestjs/common";
import { Department } from "./entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentsRepository } from "./repositories";
import { DepartmetnsController } from "./departments.controller";
import { DepartmentsService } from "./departments.service";

@Module({
    controllers: [DepartmetnsController],
    providers: [DepartmentsRepository, DepartmentsService],
    imports: [TypeOrmModule.forFeature([Department])],
    exports: [TypeOrmModule, DepartmentsRepository],
})
export class DepartmentsModule { }
