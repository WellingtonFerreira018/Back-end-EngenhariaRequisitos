import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString, IsPositive, IsString } from 'class-validator';

export class consultaDto{

    @ApiProperty({
        description: 'ID da do usuario a ser utilizado pela consulta a ser criada',
        example: '1',
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    usuarioId: number;

    @ApiProperty({
        description: 'ID da do consultorio aonde ocorrera a consulta a ser criada',
        example: '1',
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    consultorioId: number;

    @ApiProperty({
        description: 'ID do medico que vai realizar a consulta a ser criada',
        example: '1',
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    medicoId: number;

    @ApiProperty({
        description: 'Diagnostico',
        example: 'Cancer',
    })
    @IsString()
    diagnostico: string;

    @ApiProperty({
        description: 'Receita',
        example: 'Radiografia',
    })
    @IsString()
    @IsNotEmpty()
    receita: string;
    
    
    
}