import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatriculaEntity } from "./matricula.entity";
import { MatriculaController } from "./matricula.controller";
import { MatriculaServices } from "./matricula.services";
import { MatriculaRepository } from "./matricula.repository";

@Module({
    controllers: [MatriculaController],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([MatriculaEntity])],
    providers: [MatriculaServices, MatriculaRepository],
})
export class MatriculaModule {}
