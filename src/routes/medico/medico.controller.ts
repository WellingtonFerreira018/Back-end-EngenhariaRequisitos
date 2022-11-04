import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MedicoService } from './medico.service';

@ApiTags('Medico')
@Controller('medico')
export class MedicoController {
    constructor(private medicoService: MedicoService) {}

    @ApiOperation({
        description: 'Endpoint para listar os usuarios cadastrados',
      })
    @Get('')
    getAll(){
        return this.medicoService.findAll();
    }

}
