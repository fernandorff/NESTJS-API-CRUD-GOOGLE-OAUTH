import { BaseAuditEntity } from '../../../common/abstractions/entities/base-audit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeRole } from '../../employee-role/entities/employee-role.entity';

@Entity()
export class Role extends BaseAuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => EmployeeRole, (roleEmployee) => roleEmployee.role)
  roleEmployee: EmployeeRole[];
}
