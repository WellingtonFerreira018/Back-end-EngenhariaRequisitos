import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { loginDto, usuarioDto } from './usuario.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @ApiOperation({
    description: 'Endpoint para listar os usuarios cadastrados',
  })
  @Get('')
  getAll() {

    return this.usuarioService.findAll();
    
  }

  @ApiOperation({
    description: 'Endpoint para listar um usuario',
  })
  @Get(':id')
  async getOne(@Param('id') params: number) {
    //idDto){
    const usuario = await this.usuarioService.validaQuery(params);

    return usuario;
  }

  @ApiOperation({
    description: 'Endpoint para logar um usuario',
  })
  @Post('login')
  async loginUsuario(@Body() dto: loginDto) {
    
    const usuario = await this.usuarioService.login(dto);

    if (usuario == undefined){
      throw new HttpException(
        'Email ou senha incorretos',
        HttpStatus.UNAUTHORIZED,
      );
    }
  
    return usuario;

  }

  @ApiOperation({
    description: 'Endpoint para cadastrar um usuario',
  })
  @Post('')
  async createUsuario(@Body() dto: usuarioDto) {
    await this.usuarioService.validaCpf(dto.cpf);

    try {
      const cr = await this.usuarioService.create(dto);
      return cr;
    } catch (e) {
      if (
        e.sqlMessage ==
        'Cannot add or update a child row: a foreign key constraint fails (`med_cover`.`usuario`, CONSTRAINT `FK_6f962678dc18e5ec715e370e95e` FOREIGN KEY (`enderecoId`) REFERENCES `endereco` (`id`))'
      ) {
        throw new HttpException(
          'Endereço não encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }

  @ApiOperation({
    description: 'Endpoint para editar o cadastro de um usuario',
  })
  @Put(':id')
  async editUser(@Param('id') params: number, @Body() dto: usuarioDto) {
    const user = await this.usuarioService.validaQuery(params);

    user.enderecoId = dto.enderecoId;
    user.nome = dto.nome;
    user.email = dto.email;
    user.senha = dto.senha;
    user.telefone = dto.telefone;

    return this.usuarioService.create(user);
  }

  @ApiOperation({
    description: 'Endpoint para Excluir um usuario',
  })
  @Delete(':id')
  async deleteUsuario(@Param('id') params: number) {
    //idDto){
    console.log(params);
    await this.usuarioService.validaQuery(params);

    return this.usuarioService.delete(params);
  }
}
