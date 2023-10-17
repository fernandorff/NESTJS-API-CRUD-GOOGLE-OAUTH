import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectorDto } from '../dtos/create-sector.dto';
import { Sector } from '../entities/sector.entity';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
  ) {}

  async create(sector: CreateSectorDto) {
    const newSector = this.sectorRepository.create(sector);
    return await this.sectorRepository.save(newSector);
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    return await this.sectorRepository.findOne({
      where: {
        id: id,
      },
      relations: { sectorEmployee: true },
    });
  }

  async findAll() {
    return await this.sectorRepository.find({
      relations: { sectorEmployee: true },
    });
  }

  async update(id: string, attrs: Partial<Sector>) {
    const sector = await this.findOne(id);
    if (!sector) {
      throw new NotFoundException('sector not found');
    }
    Object.assign(sector, attrs);
    return await this.sectorRepository.save(sector);
  }

  async remove(id: string) {
    const sector = await this.findOne(id);
    if (!sector) {
      throw new NotFoundException('sector not found');
    }
    return await this.sectorRepository.remove(sector);
  }
}
