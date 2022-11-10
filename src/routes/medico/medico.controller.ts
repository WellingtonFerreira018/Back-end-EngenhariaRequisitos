import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { stringify } from 'querystring';
import { medicoDto } from '../medico/medico.dto';
import { MedicoService } from './medico.service';

@ApiTags('Medico')
@Controller('medico')
export class MedicoController {
    constructor(private medicoService: MedicoService) {}

    @ApiOperation({
        description: 'Endpoint para listar os medicos cadastrados',
      })
    @Get('')
    getAll(){
        return this.medicoService.findAll();
    }

    @ApiOperation({
        description: 'Endpoint para listar um medico',
      })
    @Get(':id')
    async getOne(@Param('id') params: number){//idDto){
        
        const medico = await this.medicoService.validaQuery(params);
        
        return medico;

    }

    @ApiOperation({
        description: 'Endpoint para cadastrar um medico',
      })
    @Post('')
    createMedico(@Body() dto: medicoDto){
        //return
        return this.medicoService.create(dto);
    }

    @ApiOperation({
        description: 'Endpoint para editar o cadastro de um medico',
      })
    @Put(':id')
    async editMedico(@Param('id') params: number, @Body() dto: medicoDto){
        const medico = await this.medicoService.validaQuery(params);

        medico.enderecoId = dto.enderecoId;
        medico.nome = dto.nome;
        medico.email = dto.email;
        medico.senha = dto.senha;
        medico.especializacao =  dto.especializacao;

        return this.medicoService.create(medico);
    }

    @ApiOperation({
        description: 'Endpoint para Excluir um medico',
    })
    @Delete(':id')
    async deletemedico(@Param('id') params: number){//idDto){
        console.log(params)
        await this.medicoService.validaQuery(params);

        return this.medicoService.delete(params);
    }


}
