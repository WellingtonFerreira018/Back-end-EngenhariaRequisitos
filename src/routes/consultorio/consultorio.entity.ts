import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { Endereco } from '../endereco/endereco.entity';

@Entity()
export class Consultorio {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Endereco)
    endereco: number;

    @Column({ name: 'enderecoId' })
    enderecoId: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    telefone:string;

}