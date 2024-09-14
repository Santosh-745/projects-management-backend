import { Module } from "@nestjs/common";
import { Designation } from "./entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DesignationsRepository } from "./repositories";
import { DesignationsService } from "./designations.service";
import { DesignationsController } from "./designations.controller";

@Module({
    controllers: [DesignationsController],
    providers: [DesignationsRepository, DesignationsService],
    imports: [TypeOrmModule.forFeature([Designation])],
    exports: [TypeOrmModule, DesignationsRepository],
})
export class DesignationsModule { }
