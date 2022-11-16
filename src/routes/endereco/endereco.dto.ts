import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class enderecoDto {
  @ApiProperty({
    description: 'Nome da rua',
    example: 'Rua D',
  })
  @IsString()
  nomeRua: string;

  @ApiProperty({
    description: 'Numero da rua',
    example: 2,
  })
  @IsNumberString()
  numero: number;

  @ApiProperty({
    description: 'Bairro',
    example: 'cohab cris',
  })
  @IsString()
  bairro: string;

  @ApiProperty({
    description: 'Complemento',
    example: 'Tem um jardim na frente',
  })
  @IsString()
  complemento: string;

  @ApiProperty({
    description: 'CEP',
    example: '19280000',
  })
  @IsNumberString()
  cep: string;

  @ApiProperty({
    description: 'Cidade',
    example: 'Teodoro Sampaio',
  })
  @IsString()
  cidade: string;

  @ApiProperty({
    description: 'Pais',
    example: 'Brasil',
  })
  @IsString()
  pais: string;
}

export class idDto {
  @ApiProperty({
    name: 'id',
    description: 'ID do Endereço',
    required: true,
  })
  //@IsNotEmpty()
  //@IsNumberString()
  id: number;
}
