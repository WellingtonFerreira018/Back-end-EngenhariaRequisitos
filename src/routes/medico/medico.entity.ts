import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Endereco } from '../endereco/endereco.entity';

@Entity()
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Endereco)
  endereco: number;

  @Column({ name: 'enderecoId' })
  enderecoId: number;

  @Column()
  nome: string;

  @Column()
  crm: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column({ type: 'json' })
  //@Column()
  especializacao: string[];
}
