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
import { SectorService } from '../service/sector.service';
import { CreateSectorDto } from '../dtos/create-sector.dto';
import { UpdateSectorDto } from '../dtos/update-sector.dto';

@Controller('sector')
@ApiTags('Sector')
@UseGuards(AuthGuard('jwt'))
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Get()
  @ApiOperation({ summary: 'Return all sectors.' })
  findAll() {
    return this.sectorService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Return sector by id.' })
  async findById(@Param('id') id: string) {
    const sector = await this.sectorService.findOne(id);
    if (!sector) {
      throw new NotFoundException('sector not found');
    }
    return sector;
  }

  @Post()
  @ApiOperation({ summary: 'Create sector.' })
  async createSector(@Body() body: CreateSectorDto) {
    return await this.sectorService.create(body);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete sector by id.' })
  async removeSector(@Param('id') id: string) {
    return await this.sectorService.remove(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update sector by id.' })
  async updateSector(@Param('id') id: string, @Body() body: UpdateSectorDto) {
    return await this.sectorService.update(id, body);
  }
}
