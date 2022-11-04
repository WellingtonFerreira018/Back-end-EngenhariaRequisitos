import { ApiHideProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Consultorio } from '../consultorio/consultorio.entity';
import { Medico } from '../medico/medico.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Consulta {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario)
    usuario: number;

    @ManyToOne(() => Medico)
    medico: number;

    @ManyToOne(() => Consultorio)
    consultorio: number;

    @Column()
    diagnostico: string;

    @Column()
    receita: string;

    @ApiHideProperty()
    @CreateDateColumn({ select: false })
    date: Date;
}