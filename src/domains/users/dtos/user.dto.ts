import { Expose, Type } from 'class-transformer';
import { BaseAuditDto } from '../../../common/abstractions/dtos/base-audit.dto';
import { EmployeeDto } from '../../employees/dtos/employee.dto';
import { Employee } from '../../employees/entities/employee.entity';

export class UserDto extends BaseAuditDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  admin: boolean;

  @Expose()
  dominio: string;

  @Expose()
  photo: string;

  @Expose()
  @Type(() => EmployeeDto)
  employee: Employee;
}
