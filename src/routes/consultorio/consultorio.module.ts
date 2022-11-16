import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultorioController } from './consultorio.controller';
import { Consultorio } from './consultorio.entity';
import { ConsultorioService } from './consultorio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Consultorio])],
  providers: [ConsultorioService],
  controllers: [ConsultorioController],
  exports: [ConsultorioService],
})
export class ConsultorioModule {}
