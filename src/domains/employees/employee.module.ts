import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';
import { Employee } from './entities/employee.entity';
import { EmployeeRoleModule } from '../employee-role/employee-role.module';
import { EmployeeSectorModule } from '../employee-sector/employee-sector.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    EmployeeRoleModule,
    EmployeeSectorModule,
    UsersModule
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
