import { Injectable } from '@nestjs/common';

@Injectable()
export class MedicoService {


    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
      ) {}

    findAll():Promise<Usuario[] | undefined>{
        return this.usuarioRepository.find();
    }

    find(idUsu: number):Promise<Usuario | undefined>{

        return this.usuarioRepository.findOne({
            where: { id: idUsu }
        })
    }

    async validaCpf(cpfUsu: string){
        const user = await this.usuarioRepository.findOne({
            where: { cpf: cpfUsu }
        })

        if (user){
            throw new HttpException('O CPF ja esta sendo utilizado em uma conta', HttpStatus.CONFLICT);
        }

        return;

    }

    async validaQuery(id: number){
        const usuario = await this.find(id);

        if(!usuario){
            throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
        }

        return usuario;
    }

    create(dto: usuarioDto):Promise<Usuario | undefined>{
        return this.usuarioRepository.save(dto);
    }

    async delete(idUsu: number){
        return  ((await this.usuarioRepository.delete(idUsu)).affected ?? 0) > 0;
    }

}
