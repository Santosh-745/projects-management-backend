import { IsArray, IsString } from "class-validator";

export class createProjectDto {
    @IsString()
    name: string;
    
    @IsString()
    description: string;
    
    @IsArray()
    users: number[];
}