import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { loginDto, usuarioDto } from './usuario.dto';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[] | undefined> {
    return this.usuarioRepository.find({
      select: ["id","cpf","nome"]
    });
  }

  find(idUsu: number): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({
      select: ["id","cpf","nome","email","telefone"],
      where: { id: idUsu },
    });
  }

  async validaCpf(cpfUsu: string) {
    const user = await this.usuarioRepository.findOne({
      where: { cpf: cpfUsu },
    });

    if (user) {
      throw new HttpException(
        'O CPF ja esta sendo utilizado em uma conta',
        HttpStatus.CONFLICT,
      );
    }

    return;
  }

  async login( dto: loginDto): Promise<Usuario | undefined>{
    
    const user = await this.usuarioRepository.findOne({
      where: { email: dto.email, senha:dto.senha },
    });

    return user;

  }

  async validaQuery(id: number): Promise<Usuario | undefined>{
    const usuario = await this.find(id);

    if (!usuario) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    return usuario;
  }

  create(dto: usuarioDto): Promise<Usuario | undefined> {
    return this.usuarioRepository.save(dto);
  }

  async delete(idUsu: number) {
    return ((await this.usuarioRepository.delete(idUsu)).affected ?? 0) > 0;
  }
}
