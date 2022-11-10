import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultaController } from './consulta.controller';
import { Consulta } from './consulta.entity';
import { ConsultaService } from './consulta.service';

@Module({
    imports: [TypeOrmModule.forFeature([Consulta])],
    providers: [ConsultaService],
    controllers:[ConsultaController],
    exports: [ConsultaService]
})
export class ConsultaModule {}
