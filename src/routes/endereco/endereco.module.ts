import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller';
import { EnderecoService } from './endereco.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './endereco.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Endereco])],
    providers: [EnderecoService],
    controllers:[EnderecoController],
    exports: [EnderecoService]
})
export class EnderecoModule {}
