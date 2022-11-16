import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { enderecoDto } from './endereco.dto';
import { Endereco } from './endereco.entity';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
  ) {}

  findAll(): Promise<Endereco[] | undefined> {
    return this.enderecoRepository.find();
  }

  async validaQuery(id: number) {
    const endereco = await this.find(id);

    if (!endereco) {
      throw new HttpException('Endereço não encontrado', HttpStatus.NOT_FOUND);
    }

    return endereco;
  }

  find(idEnd: number): Promise<Endereco | undefined> {
    return this.enderecoRepository.findOne({
      where: { id: idEnd },
    });
  }

  create(dto: enderecoDto): Promise<Endereco | undefined> {
    return this.enderecoRepository.save(dto);
  }

  async delete(idEnd: number) {
    return ((await this.enderecoRepository.delete(idEnd)).affected ?? 0) > 0;
  }
}
