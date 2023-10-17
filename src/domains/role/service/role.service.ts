import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dtos/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(request: CreateRoleDto) {
    const role = new Role();
    role.name = request.name;
    role.description = request.description;
    const newRole = this.roleRepository.create(role);
    return this.roleRepository.save(newRole);
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    return this.roleRepository.findOne({
      where: {
        id: id,
      },
      relations: { roleEmployee: true },
    });
  }

  async findAll() {
    return this.roleRepository.find({
      relations: { roleEmployee: true },
    });
  }

  async update(id: string, attrs: Partial<Role>) {
    const role = await this.findOne(id);
    if (!role) {
      throw new NotFoundException('role not found');
    }
    Object.assign(role, attrs);
    return this.roleRepository.save(role);
  }

  async remove(id: string) {
    const role = await this.findOne(id);
    if (!role) {
      throw new NotFoundException('role not found');
    }
    return this.roleRepository.remove(role);
  }
}
