import { Expose, Type } from "class-transformer";
import { EmployeeDto } from "src/domains/employees/dtos/employee.dto";
import { RoleDto } from "src/domains/role/dtos/role.dto";
import { Role } from "src/domains/role/entities/role.entity";

export class EmployeeRoleDto {
    @Expose()
    id: string;
  
    @Expose()
    membershipDate: Date;
  
    @Expose()
    membershipCancelationDate: Date;
  
    // @Expose()
    // @Type(() => EmployeeDto)
    // employee: EmployeeDto;
  
    @Expose()
    @Type(() => Role)
    role: Role;
  
  }