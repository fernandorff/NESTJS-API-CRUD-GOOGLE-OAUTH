import { BaseAuditEntity } from '../../../common/abstractions/entities/base-audit.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class EmployeeRole extends BaseAuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  membershipDate: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  membershipCancelationDate: Date | null;

  @ManyToOne(() => Employee, (employee) => employee.employeeRole)
  employee: Employee;

  @ManyToOne(() => Role, (role) => role.roleEmployee)
  role: Role;
}
