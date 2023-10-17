import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { BaseAuditEntity } from '../../../common/abstractions/entities/base-audit.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { FirstAccessRequestStatus } from '../enums/first-access-request-status.enum';

@Entity()
export class User extends BaseAuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  displayName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  dominio: string;

  @Column()
  photo: string;

  @Column({ default: false })
  admin: boolean;

  @Column({
    type: 'enum',
    enum: FirstAccessRequestStatus,
    default: FirstAccessRequestStatus.ACCESS_REQUEST_SENT
  })
  status: FirstAccessRequestStatus;

  @OneToOne(() => Employee, (employee) => employee.user)
  employee: Employee;
}