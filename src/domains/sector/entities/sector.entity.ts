import { BaseAuditEntity } from '../../../common/abstractions/entities/base-audit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeSector } from '../../employee-sector/entities/employee-sector.entity';

@Entity()
export class Sector extends BaseAuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => EmployeeSector, (emplouyeeSector) => emplouyeeSector.sector)
  sectorEmployee: EmployeeSector[];
}
