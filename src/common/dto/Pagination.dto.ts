import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";
/**
 * Esta clase se utiliza para hacer un filtrado o paginacion
 */
export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?: number;
}