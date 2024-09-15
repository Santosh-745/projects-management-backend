import { IsIn, IsInt, IsOptional } from "class-validator";

export class FilterDto {
    @IsOptional()
    @IsInt()
    page: number;

    @IsOptional()
    @IsInt()
    limit: number;

    @IsOptional()
    @IsInt()
    search: string;
    
    @IsOptional()
    @IsIn(['departmentId', 'designationId', 'locationId'])
    filterField: string;
    
    @IsOptional()
    @IsInt()
    filterValue: number;
}