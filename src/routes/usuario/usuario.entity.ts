import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Endereco } from '../endereco/endereco.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Endereco)
  endereco: number;

  @Column({ name: 'enderecoId' })
  enderecoId: number;

  @Column()
  cpf: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  telefone: string;
}
