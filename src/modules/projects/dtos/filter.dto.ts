import { IsInt, IsOptional } from "class-validator";

export class FilterDto {
    @IsOptional()
    @IsInt()
    page: number;
    
    @IsOptional()
    @IsInt()
    limit: number;
}