import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorController } from './controller/sector.controller';
import { Sector } from './entities/sector.entity';
import { SectorService } from './service/sector.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sector])],
  controllers: [SectorController],
  providers: [SectorService],
  exports: [SectorService]
})
export class SectorModule { }