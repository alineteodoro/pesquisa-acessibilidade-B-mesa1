import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AvaliacaoCursoEntity } from "./avaliacao-curso.entity";
import { AvaliacaoCursoController } from "./avaliacao-curso.controller";
import { AvaliacaoCursoServices } from "./avaliacao-curso.services";
import { AvaliacaoCursoRepository } from "./avaliacao-curso.repository";

@Module({
    controllers: [AvaliacaoCursoController],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([AvaliacaoCursoEntity])],
    providers: [AvaliacaoCursoServices, AvaliacaoCursoRepository],
})
export class AvaliacaoCursoModule {}
