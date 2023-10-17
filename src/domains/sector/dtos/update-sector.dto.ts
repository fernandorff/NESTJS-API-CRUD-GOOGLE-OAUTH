import { Expose, Type } from "class-transformer";
import { IsString } from "class-validator";
import { EmployeeSector } from "src/domains/employee-sector/entities/employee-sector.entity";

export class UpdateSectorDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsString()
    description: string;

    @Expose()
    @Type(() => EmployeeSector)
    sectorEmployee: EmployeeSector[];
}