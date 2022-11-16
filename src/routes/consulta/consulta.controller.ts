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
import { consultaDto } from './consulta.dto';
import { ConsultaService } from './consulta.service';

@ApiTags('Consulta')
@Controller('consulta')
export class ConsultaController {
  constructor(private consultaService: ConsultaService) {}

  @ApiOperation({
    description: 'Endpoint para listar os consultas cadastrados',
  })
  @Get('')
  getAll() {
    return this.consultaService.findAll();
  }

  @ApiOperation({
    description: 'Endpoint para listar um consulta',
  })
  @Get(':id')
  async getOne(@Param('id') params: number) {
    //idDto){

    return await this.consultaService.validaQuery(params);
  }

  @ApiOperation({
    description: 'Endpoint para cadastrar um consulta',
  })
  @Post('')
  async createconsulta(@Body() dto: consultaDto) {
    try {
      const cr = await this.consultaService.create(dto);
      return cr;
    } catch (e) {
      if (
        e.sqlMessage ==
        'Cannot add or update a child row: a foreign key constraint fails (`med_cover`.`consulta`, CONSTRAINT `FK_0ccaf3cf7888266ee10a8b60c65` FOREIGN KEY (`consultorioId`) REFERENCES `consultorio` (`id`))'
      ) {
        throw new HttpException(
          'Consultorio não encontrado',
          HttpStatus.NOT_FOUND,
        );
      }

      if (
        e.sqlMessage ==
        'Cannot add or update a child row: a foreign key constraint fails (`med_cover`.`consulta`, CONSTRAINT `FK_f3f4259b920b9dc53adad1a30d1` FOREIGN KEY (`medicoId`) REFERENCES `medico` (`id`))'
      ) {
        throw new HttpException('Medico não encontrado', HttpStatus.NOT_FOUND);
      }

      if (
        e.sqlMessage ==
        'Cannot add or update a child row: a foreign key constraint fails (`med_cover`.`consulta`, CONSTRAINT `FK_1fe809eb27c3a3ddfc8be164fe7` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`))'
      ) {
        throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
      }
    }
  }

  @ApiOperation({
    description: 'Endpoint para editar o cadastro de um consulta',
  })
  @Put(':id')
  async editConsult(@Param('id') params: number, @Body() dto: consultaDto) {
    const consult = await this.consultaService.validaQuery(params);

    consult.diagnostico = dto.diagnostico;
    consult.receita = dto.receita;

    return this.consultaService.create(consult);
  }

  @ApiOperation({
    description: 'Endpoint para Excluir um consulta',
  })
  @Delete(':id')
  async deleteconsulta(@Param('id') params: number) {
    //idDto){
    console.log(params);
    await this.consultaService.validaQuery(params);

    return this.consultaService.delete(params);
  }
}
