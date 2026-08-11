import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProgressoModule } from './modules/progresso/progresso.module';
import { AulaModule } from './modules/aula/aula.module';
import { AvaliacaoCursoModule } from './modules/avaliacao-curso/avaliacao-curso.module';
import { ConteudoModule } from './modules/conteudo/conteudo.module';
import { CursoModule } from './modules/curso/curso.module';
import { MatriculaModule } from './modules/matricula/matricula.module';
import { ModuloModule } from './modules/modulo/modulo.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),

    AulaModule,
    AuthModule,
    AvaliacaoCursoModule,
    ConteudoModule,
    CursoModule,
    MatriculaModule,
    ModuloModule,
    ProgressoModule,

  ],
})

export class AppModule {}
