import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Consultorio } from '../consultorio/consultorio.entity';

@Entity()
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Consultorio)
  consultorio: number;

  @Column({ name: 'consultorioId' })
  consultorioId: number;

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
