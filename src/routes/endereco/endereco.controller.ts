import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { enderecoDto, idDto } from './endereco.dto';
import { EnderecoService } from './endereco.service';


@ApiTags('Endereco')
@Controller('endereco')
export class EnderecoController {

    constructor(private enderecoService: EnderecoService) {}

    @ApiOperation({
        description: 'Endpoint para listar os endereços cadastrados',
      })
    @Get('')
    getAll(){
        return this.enderecoService.findAll();
    }

    @ApiOperation({
        description: 'Endpoint para listar um endereço',
      })
    @Get(':id')
    async getOne(@Param('id') params: number){//idDto){""}

      const endereco = this.enderecoService.validaQuery(params);
        
      return endereco;

    }

    @ApiOperation({
        description: 'Endpoint para cadastrar um endereço',
      })
    @Post('')
    createEndereco(@Body() dto: enderecoDto){
        return this.enderecoService.create(dto);
    }

    @ApiOperation({
      description: 'Endpoint para alterar um endereço',
    })
  @Put(':id')
  async editEndereco(@Param('id') params: number/*idDto*/, @Body() dto: enderecoDto){
      const endereco = await this.enderecoService.validaQuery(params);

      endereco.nomeRua = dto.nomeRua;
      endereco.numero = dto.numero;
      endereco.bairro = dto.bairro;
      endereco.complemento = dto.complemento;
      endereco.cep = dto.cep;
      endereco.cidade = dto.cidade;
      endereco.pais = dto.pais;

      return this.enderecoService.create(endereco);
    }

    @ApiOperation({
        description: 'Endpoint para excluir um endereço',
      })
    @Delete(':id')
    async deleteEndereco(@Param('id') params: number){
      
      await this.enderecoService.validaQuery(params);

      return this.enderecoService.delete(params);
    
    }

}
