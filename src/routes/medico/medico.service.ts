import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { medicoDto } from './medico.dto';
import { Medico } from './medico.entity';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private medicoRepository: Repository<Medico>,
  ) {}

  findAll(): Promise<Medico[] | undefined> {
    return this.medicoRepository.find({
      select: ["id","nome","especializacao"]
    });
  }

  find(idUsu: number): Promise<Medico | undefined> {
    return this.medicoRepository.findOne({
      select: ["id","nome","crm","email","especializacao"],
      where: { id: idUsu },
    });
  }

  async validaQuery(id: number) {
    const medico = await this.find(id);

    if (!medico) {
      throw new HttpException('medico não encontrado', HttpStatus.NOT_FOUND);
    }

    return medico;
  }

  create(dto: medicoDto) {
    return this.medicoRepository.save(dto);
  }

  async delete(idUsu: number) {
    return ((await this.medicoRepository.delete(idUsu)).affected ?? 0) > 0;
  }
}
