import { Module } from "@nestjs/common";
import { Location } from "./entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocationsRepository } from "./repositories";
import { LocationsService } from "./locations.service";
import { LocationsController } from "./locations.controller";

@Module({
    controllers: [LocationsController],
    providers: [LocationsRepository, LocationsService],
    imports: [TypeOrmModule.forFeature([Location])],
    exports: [TypeOrmModule, LocationsRepository],
})
export class LocationsModule { }
