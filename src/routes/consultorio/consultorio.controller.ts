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
import { consultorioDto } from './consultorio.dto';
import { ConsultorioService } from './consultorio.service';

@ApiTags('Consultorio')
@Controller('consultorio')
export class ConsultorioController {
  constructor(private consultorioService: ConsultorioService) {}

  @ApiOperation({
    description: 'Endpoint para listar os consultorios cadastrados',
  })
  @Get('')
  getAll() {
    return this.consultorioService.findAll();
  }

  @ApiOperation({
    description: 'Endpoint para listar um consultorio',
  })
  @Get(':id')
  async getOne(@Param('id') params: number) {
    //idDto){

    return await this.consultorioService.validaQuery(params);
  }

  @ApiOperation({
    description: 'Endpoint para cadastrar um consultorio',
  })
  @Post('')
  async createconsultorio(@Body() dto: consultorioDto) {
    try {
      const cr = await this.consultorioService.create(dto);
      return cr;
    } catch (e) {
      if (
        e.sqlMessage ==
        'Cannot add or update a child row: a foreign key constraint fails (`med_cover`.`consultorio`, CONSTRAINT `FK_e5cbba61b1241bc8203e54032de` FOREIGN KEY (`enderecoId`) REFERENCES `endereco` (`id`))'
      ) {
        throw new HttpException(
          'Endereço não encontrado',
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }

  @ApiOperation({
    description: 'Endpoint para editar o cadastro de um consultorio',
  })
  @Put(':id')
  async editConsult(@Param('id') params: number, @Body() dto: consultorioDto) {
    const consult = await this.consultorioService.validaQuery(params);

    consult.enderecoId = dto.enderecoId;
    consult.nome = dto.nome;
    consult.email = dto.email;
    consult.telefone = dto.telefone;

    return this.consultorioService.create(consult);
  }

  @ApiOperation({
    description: 'Endpoint para Excluir um consultorio',
  })
  @Delete(':id')
  async deleteconsultorio(@Param('id') params: number) {
    //idDto){
    console.log(params);
    await this.consultorioService.validaQuery(params);

    return this.consultorioService.delete(params);
  }
}
