import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class medicoDto {
  @ApiProperty({
    description: 'ID do consultorio a ser utilizada pelo medico a ser cadastrado',
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  consultorioId: number;

  @ApiProperty({
    description: 'Nome',
    example: 'medico',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Email',
    example: 'medico@medico.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha',
    example: '12345',
  })
  @IsString()
  @IsNotEmpty()
  senha: string;

  @ApiProperty({
    description: 'REM',
    example: '123123',
  })
  @IsNotEmpty()
  crm: string;

  @ApiProperty({
    description: 'Especializações do medico',
    example: ['Odontologia', 'Nutrição', 'Cardiologia'],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  especializacao: string[];
}
