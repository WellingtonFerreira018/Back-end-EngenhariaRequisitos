import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { consultorioDto } from './consultorio.dto';
import { Consultorio } from './consultorio.entity';

@Injectable()
export class ConsultorioService {
  constructor(
    @InjectRepository(Consultorio)
    private consultorioRepository: Repository<Consultorio>,
  ) {}

  findAll(): Promise<Consultorio[] | undefined> {
    return this.consultorioRepository.find();
  }

  find(idUsu: number): Promise<Consultorio | undefined> {
    return this.consultorioRepository.findOne({
      where: { id: idUsu },
    });
  }

  async validaQuery(id: number) {
    const consultorio = await this.find(id);

    if (!consultorio) {
      throw new HttpException(
        'consultorio não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return consultorio;
  }

  create(dto: consultorioDto): Promise<Consultorio | undefined> {
    return this.consultorioRepository.save(dto);
  }

  async delete(idConsult: number) {
    return (
      ((await this.consultorioRepository.delete(idConsult)).affected ?? 0) > 0
    );
  }
}
