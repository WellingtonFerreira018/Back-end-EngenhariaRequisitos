import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Endereco } from '../endereco/endereco.entity';

@Entity()
export class Consultorio {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Endereco)
    endereco: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    telefone:string;

}