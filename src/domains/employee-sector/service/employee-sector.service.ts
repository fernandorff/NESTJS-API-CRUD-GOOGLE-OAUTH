import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/domains/employees/entities/employee.entity';
import { SectorService } from 'src/domains/sector/service/sector.service';
import { Repository } from 'typeorm';
import { EmployeeSector } from '../entities/employee-sector.entity';

@Injectable()
export class EmployeeSectorService {
  constructor(
    @InjectRepository(EmployeeSector)
    private readonly employeeSectorRepository: Repository<EmployeeSector>,
    private readonly sectorService: SectorService,
  ) {}

  async createEmpSector(employee: Employee, id: string) {
    const sector = await this.sectorService.findOne(id);
    if (!sector) {
      return null;
    }
    const newEmpSector = new EmployeeSector();
    newEmpSector.employee = employee;
    newEmpSector.sector = sector;

    const empRole = this.employeeSectorRepository.create(newEmpSector);
    return await this.employeeSectorRepository.save(empRole);
  }
}
