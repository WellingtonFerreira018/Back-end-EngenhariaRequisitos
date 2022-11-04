
import { json } from 'express';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Endereco } from '../endereco/endereco.entity';

@Entity()
export class Medico {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Endereco)
    endereco: number;

    @Column()
    nome: string;

    @Column()
    crm: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    especializacao: string;

}