import { Expose, Type } from 'class-transformer';
import { EmployeeRoleDto } from 'src/domains/employee-role/dtos/employee-role.dto';
import { UserDto } from '../../users/dtos/user.dto';
import { EmployeeRole } from 'src/domains/employee-role/entities/employee-role.entity';
import { EmployeeSector } from 'src/domains/employee-sector/entities/employee-sector.entity';

export class EmployeeDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  cpf: string;

  @Expose()
  phone: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => EmployeeSector)
  emplouyeeSector: EmployeeSector[];

  @Expose()
  emplouyeeRole: EmployeeRole[];
}
