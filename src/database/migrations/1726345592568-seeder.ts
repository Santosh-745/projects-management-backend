import { MigrationInterface, QueryRunner } from "typeorm";

import { Department } from "../../modules/departments/entities";
import * as departments from "../data/departments.json";
import * as designations from "../data/designations.json";
import * as locations from "../data/locations.json";
import { Designation } from "../../modules/designations/entities";
import { Location } from "../../modules/locations/entities";


export class Seeder1726345592568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().insert().into(Department).values(departments).execute();
        await queryRunner.manager.createQueryBuilder().insert().into(Designation).values(designations).execute();
        await queryRunner.manager.createQueryBuilder().insert().into(Location).values(locations).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder().delete().from(Department).execute();
        await queryRunner.manager.createQueryBuilder().delete().from(Designation).execute();
        await queryRunner.manager.createQueryBuilder().delete().from(Location).execute();
    }

}
