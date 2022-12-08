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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  getAll() {
    return this.medicoService.findAll();
  }

  @ApiOperation({
    description: 'Endpoint para listar um medico',
  })
  @Get(':id')
  async getOne(@Param('id') params: number) {
    //idDto){

    const medico = await this.medicoService.validaQuery(params);

    return medico;
  }

  @ApiOperation({
    description: 'Endpoint para cadastrar um medico',
  })
  @Post('')
  async createMedico(@Body() dto: medicoDto) {
    //
    try {
      const cr = await this.medicoService.create(dto);
      return cr;
    } catch (e) {

      if (
        e.sqlMessage ==
        'Cannot add or update a child row: a foreign key constraint fails (`med_cover`.`medico`, CONSTRAINT `FK_d3af27e17ce803080eb2e8cf6b4` FOREIGN KEY (`consultorioId`) REFERENCES `consultorio` (`id`))'
      ) {
        throw new HttpException(
          'Consultorio não encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }

  @ApiOperation({
    description: 'Endpoint para editar o cadastro de um medico',
  })
  @Put(':id')
  async editMedico(@Param('id') params: number, @Body() dto: medicoDto) {
    const medico = await this.medicoService.validaQuery(params);

    medico.consultorioId = dto.consultorioId;
    medico.nome = dto.nome;
    medico.email = dto.email;
    medico.senha = dto.senha;
    medico.especializacao = dto.especializacao;

    return this.medicoService.create(medico);
  }

  @ApiOperation({
    description: 'Endpoint para Excluir um medico',
  })
  @Delete(':id')
  async deletemedico(@Param('id') params: number) {
    //idDto){
    console.log(params);
    await this.medicoService.validaQuery(params);

    return this.medicoService.delete(params);
  }
}
