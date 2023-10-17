import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRole } from '../entities/employee-role.entity';
import { Repository } from 'typeorm';
import { BaseCrudService } from 'src/common/abstractions/services/base-crud.service';
import { Employee } from 'src/domains/employees/entities/employee.entity';
import { RoleService } from 'src/domains/role/service/role.service';

@Injectable()
export class EmployeeRoleService {
  constructor(
    @InjectRepository(EmployeeRole)
    private readonly employeeRoleRepository: Repository<EmployeeRole>,
    private readonly roleService: RoleService,
  ) {}

  async createEmpRole(employee: Employee, id: string) {
    const role = await this.roleService.findOne(id);
    if (!role) {
      return null;
    }
    const newEmpRole = new EmployeeRole();
    newEmpRole.employee = employee;
    newEmpRole.role = role;

    const empRole = this.employeeRoleRepository.create(newEmpRole);
    return await this.employeeRoleRepository.save(empRole);
  }
}
