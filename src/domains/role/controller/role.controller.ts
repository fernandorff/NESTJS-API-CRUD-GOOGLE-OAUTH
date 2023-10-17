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
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { RoleService } from '../service/role.service';

@Controller('role')
@ApiTags('Role')
@UseGuards(AuthGuard('jwt'))
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  @ApiOperation({ summary: 'Return all roles.' })
  findAll() {
    return this.roleService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Return role by id.' })
  async findById(@Param('id') id: string) {
    const role = await this.roleService.findOne(id);
    if (!role) {
      throw new NotFoundException('role not found');
    }
    return role;
  }

  @Post()
  @ApiOperation({ summary: 'Create role.' })
  async createRole(@Body() body: CreateRoleDto) {
    return await this.roleService.create(body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete role by id.' })
  async removeRole(@Param('id') id: string) {
    return await this.roleService.remove(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update role by id.' })
  async updateRole(@Param('id') id: string, @Body() body: UpdateRoleDto) {
    return await this.roleService.update(id, body);
  }
}
