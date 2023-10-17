import { Expose, Type } from "class-transformer";
import { IsString } from "class-validator";
import { EmployeeRole } from "src/domains/employee-role/entities/employee-role.entity";

export class UpdateRoleDto {
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
    @Type(() => EmployeeRole)
    roleEmployee: EmployeeRole[];
}