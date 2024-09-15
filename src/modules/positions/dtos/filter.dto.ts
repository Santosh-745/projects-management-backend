import { IsIn, IsNumberString, IsOptional } from "class-validator";

export class FilterDto {
    @IsOptional()
    @IsNumberString()
    page: number;

    @IsOptional()
    @IsNumberString()
    limit: number;

    @IsOptional()
    @IsNumberString()
    search: string;
    
    @IsOptional()
    @IsIn(['departmentId', 'designationId', 'locationId'])
    filterField: string;
    
    @IsOptional()
    @IsNumberString()
    filterValue: number;
}