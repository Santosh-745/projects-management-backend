import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreatePositionDto {
    @IsNumber()
    @IsNotEmpty()
    designationId: number;

    @IsNumber()
    @IsNotEmpty()
    departmentId: number;

    @IsNumber()
    @IsNotEmpty()
    budget: number;

    @IsNumber()
    @IsNotEmpty()
    locationId: number;
}