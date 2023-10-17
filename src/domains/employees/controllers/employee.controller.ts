import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { EmployeeService } from '../services/employee.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { EmployeeDto } from '../dtos/employee.dto';

@Controller('employee')
@ApiTags('Employee')
@UseGuards(AuthGuard('jwt'))
// @Serialize(EmployeeDto)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiOperation({ summary: 'Return all employees.' })
  async findAll() {
    return await this.employeeService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Return employee by id.' })
  async findById(@Param('id') id: string) {
    const employee = await this.employeeService.findOne(id);
    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    return employee;
  }

  @Post()
  @ApiOperation({ summary: 'Create employee for the current user.' })
  async createEmployee(@Body() body: CreateEmployeeDto) {
    return await this.employeeService.createEmployee(body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete employee by id.' })
  async removeEmployee(@Param('id') id: string) {
    return await this.employeeService.remove(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update employee by id.' })
  async updateEmployee(
    @Param('id') id: string,
    @Body() body: UpdateEmployeeDto,
  ) {
    return await this.employeeService.update(id, body);
  }
}
