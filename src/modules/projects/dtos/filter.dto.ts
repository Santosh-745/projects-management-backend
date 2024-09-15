import { IsNumberString, IsOptional } from "class-validator";

export class FilterDto {
    @IsOptional()
    @IsNumberString()
    page: number;
    
    @IsOptional()
    @IsNumberString()
    limit: number;
}