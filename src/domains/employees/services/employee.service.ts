import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRoleService } from 'src/domains/employee-role/service/employee-role.service';
import { EmployeeSectorService } from 'src/domains/employee-sector/service/employee-sector.service';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { Employee } from '../entities/employee.entity';
import { UsersService } from 'src/domains/users/services/users.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly employeeRoleService: EmployeeRoleService,
    private readonly employeeSectorService: EmployeeSectorService,
    private readonly usersService: UsersService,
  ) {}

  async createEmployee(request: CreateEmployeeDto) {
    const newEmployee = new Employee();
    newEmployee.name = request.name;
    newEmployee.cpf = request.cpf;
    newEmployee.phone = request.phone;
    newEmployee.employeeRole = [];
    newEmployee.employeeSector = [];

    const employee = this.employeeRepository.create(newEmployee);
    const user = await this.usersService.findOne(request.idUser);
    const employeeSector = await this.employeeSectorService.createEmpSector(
      employee,
      request.idSector,
    );
    const employeeRole = await this.employeeRoleService.createEmpRole(
      employee,
      request.idRole,
    );

    if (!employeeSector || !employeeRole || !user) {
      return null;
    }

    employee.user = user;
    employee.employeeSector.push(employeeSector);
    employee.employeeRole.push(employeeRole);

    return await this.employeeRepository.save(employee);
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    return await this.employeeRepository.findOne({
      where: {
        id: id,
      },
      relations: { employeeRole: true, employeeSector: true },
    });
  }

  // findOneByEmail(email: string) {
  //   return this.employeeRepository.findOne({
  //     where: { email },
  //     relations: {user: true ,employeeRole: true, employeeSector: true}
  //   });
  // }

  async findAll() {
    return await this.employeeRepository.find({
      relations: {
        user: true,
        employeeRole: { role: true },
        employeeSector: {sector: true},
      },
    });
  }

  async update(id: string, attrs: Partial<Employee>) {
    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    Object.assign(employee, attrs);
    return await this.employeeRepository.save(employee);
  }

  async remove(id: string) {
    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    return await this.employeeRepository.remove(employee);
  }
}
