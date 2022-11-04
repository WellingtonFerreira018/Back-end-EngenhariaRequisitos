
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Endereco {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomeRua: string;

    @Column()
    numero: number;

    @Column()
    bairro: string;

    @Column()
    complemento: string;

    @Column()
    cep: string;

    @Column()
    cidade: string;

    @Column()
    pais: string;

}


