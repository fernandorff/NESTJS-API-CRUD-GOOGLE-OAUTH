import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsEmail, IsOptional } from 'class-validator';
import { EmployeeDto } from 'src/domains/employees/dtos/employee.dto';
import { Employee } from 'src/domains/employees/entities/employee.entity';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ example: 'users@example.com' })
  email: string;

  @Expose()
  dominio: string;

  @Expose()
  photo: string;

  @Expose()
  admin: boolean;

  @Expose()
  @Type(() => EmployeeDto)
  employee: Employee;
}
