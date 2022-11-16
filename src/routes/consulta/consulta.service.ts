import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { consultaDto } from './consulta.dto';
import { Consulta } from './consulta.entity';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectRepository(Consulta)
    private consultaRepository: Repository<Consulta>,
  ) {}

  findAll(): Promise<Consulta[] | undefined> {
    return this.consultaRepository.find();
  }

  find(idUsu: number): Promise<Consulta | undefined> {
    return this.consultaRepository.findOne({
      where: { id: idUsu },
    });
  }

  async validaQuery(id: number) {
    const consulta = await this.find(id);

    if (!consulta) {
      throw new HttpException('consulta não encontrada', HttpStatus.NOT_FOUND);
    }

    return consulta;
  }

  create(dto: consultaDto): Promise<Consulta | undefined> {
    return this.consultaRepository.save(dto);
  }

  async delete(idConsult: number) {
    return (
      ((await this.consultaRepository.delete(idConsult)).affected ?? 0) > 0
    );
  }
}
