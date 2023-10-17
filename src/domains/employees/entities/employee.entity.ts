import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseAuditEntity } from '../../../common/abstractions/entities/base-audit.entity';
import { EmployeeSector } from '../../../domains/employee-sector/entities/employee-sector.entity';
import { EmployeeRole } from '../../../domains/employee-role/entities/employee-role.entity';

@Entity()
export class Employee extends BaseAuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @OneToOne(() => User, (user) => user.employee)
  @JoinColumn()
  user: User;

  @OneToMany(
    () => EmployeeSector,
    (employeeSector) => employeeSector.employee,
  )
  employeeSector: EmployeeSector[];

  @OneToMany(
    () => EmployeeRole,
    (employeeRole) => employeeRole.employee
  )
  employeeRole: EmployeeRole[];
}
