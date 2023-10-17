import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
  ) {}

  create(user: User) {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  findOne(id: string) {
    if (!id) {
      return null;
    }
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['employee'],
    });
  }

  findOneByEmail(email: string) {
    return this.repository.findOne({
      where: { email },
      relations: {employee: true}
    });
  }

  findAll() {
    return this.repository.find({
      relations: ['employee'],
    });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('users not found');
    }
    Object.assign(user, attrs);
    return this.repository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('users not found');
    }
    return this.repository.remove(user);
  }

}
