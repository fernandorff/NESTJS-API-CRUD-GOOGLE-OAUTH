import { BaseAuditEntity } from '../../../common/abstractions/entities/base-audit.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { Sector } from '../../sector/entities/sector.entity';

@Entity()
export class EmployeeSector extends BaseAuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  membershipDate: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  membershipCancelationDate: Date | null;

  @ManyToOne(() => Employee, (employee) => employee.employeeSector)
  employee: Employee;

  @ManyToOne(() => Sector, (sector) => sector.sectorEmployee)
  sector: Sector;
}
