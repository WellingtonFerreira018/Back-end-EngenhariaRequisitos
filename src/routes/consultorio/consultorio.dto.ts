import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
} from 'class-validator';

export class consultorioDto {
  @ApiProperty({
    description:
      'ID da do endereço a ser utilizada pelo consultorio a ser criado',
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  enderecoId: number;

  @ApiProperty({
    description: 'Nome',
    example: 'Erik',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Email',
    example: 'erik@erik.com',
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
    description: 'Telefone',
    example: '18998059981',
  })
  @IsNumberString()
  telefone: string;
}
