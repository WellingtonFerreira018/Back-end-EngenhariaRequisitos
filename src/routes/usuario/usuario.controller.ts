import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { idDto } from '../endereco/endereco.dto';
import { usuarioDto } from './usuario.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) {}

    @ApiOperation({
        description: 'Endpoint para listar os usuarios cadastrados',
      })
    @Get('')
    getAll(){
        return this.usuarioService.findAll();
    }

    @ApiOperation({
        description: 'Endpoint para listar um usuario',
      })
    @Get(':id')
    async getOne(@Param('id') params: number){//idDto){
        
        const usuario = await this.usuarioService.validaQuery(params);
        
        return usuario;

    }

    @ApiOperation({
        description: 'Endpoint para cadastrar um usuario',
      })
    @Post('')
    async createUsuario(@Body() dto: usuarioDto){

        await this.usuarioService.validaCpf(dto.cpf);

        return this.usuarioService.create(dto);
    }

    @ApiOperation({
        description: 'Endpoint para editar o cadastro de um usuario',
      })
    @Put(':id')
    async editUser(@Param('id') params: number, @Body() dto: usuarioDto){
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
    async deleteUsuario(@Param('id') params: number){//idDto){
        console.log(params)
        await this.usuarioService.validaQuery(params);

        return this.usuarioService.delete(params);
    }


}

