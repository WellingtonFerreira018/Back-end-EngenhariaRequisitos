import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
} from 'class-validator';

export class usuarioDto {
  @ApiProperty({
    description: 'ID do endereço a ser utilizada pelo usuario a ser criado',
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  enderecoId: number;

  @ApiProperty({
    description: 'CPF',
    example: '12312312399',
  })
  @IsString()
  @IsNotEmpty()
  cpf: string;

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

export class loginDto{

  @ApiProperty({
    description: 'Email',
    example: 'erik@erik.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha',
    example: '12345',
  })
  @IsNotEmpty()
  senha: string;

}