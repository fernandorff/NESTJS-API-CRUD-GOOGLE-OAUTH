import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSector } from './entities/employee-sector.entity';
import { EmployeeSectorController } from './controller/employee-sector.controller';
import { EmployeeSectorService } from './service/employee-sector.service';
import { Sector } from '../sector/entities/sector.entity';
import { SectorModule } from '../sector/sector.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeSector, Sector]), SectorModule],
  controllers: [EmployeeSectorController],
  providers: [EmployeeSectorService],
  exports: [EmployeeSectorService],
})
export class EmployeeSectorModule {}