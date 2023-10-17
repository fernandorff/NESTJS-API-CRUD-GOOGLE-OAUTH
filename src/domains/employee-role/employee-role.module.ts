import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRole } from './entities/employee-role.entity';
import { EmployeeRoleController } from './controller/employee-role.controller';
import { EmployeeRoleService } from './service/employee-role.service';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeRole]), RoleModule],
  controllers: [EmployeeRoleController],
  providers: [EmployeeRoleService],
  exports: [EmployeeRoleService],
})
export class EmployeeRoleModule {}
