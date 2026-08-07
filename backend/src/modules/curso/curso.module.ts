import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CursoEntity } from "./curso.entity";
import { CursoController } from "./curso.controller";
import { CursoServices } from "./curso.services";
import { CursoRepository } from "./curso.repository";

@Module({
    controllers: [CursoController],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([CursoEntity])],
    providers: [CursoServices, CursoRepository],
})
export class CursoModule {}
