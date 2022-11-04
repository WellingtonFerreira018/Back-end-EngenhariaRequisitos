import { Module } from '@nestjs/common';
import { join } from 'path'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultaModule } from './routes/consulta/consulta.module';
import { ConsultorioModule } from './routes/consultorio/consultorio.module';
import { EnderecoModule } from './routes/endereco/endereco.module';
import { MedicoModule } from './routes/medico/medico.module';
import { UsuarioModule } from './routes/usuario/usuario.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0000',
      database: 'med_cover',
      entities:[join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConsultaModule,
    ConsultorioModule,
    EnderecoModule,
    MedicoModule,
    UsuarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
