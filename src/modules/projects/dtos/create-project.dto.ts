import { IsArray, IsNumberString, IsString } from "class-validator";

export class createProjectDto {
    @IsString()
    name: string;
    
    @IsString()
    description: string;
    
    @IsArray()
    users: number[];

    @IsNumberString()
    budget: number;
}