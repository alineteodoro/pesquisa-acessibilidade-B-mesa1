import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModuloEntity } from "./modulo.entity";
import { ModuloController } from "./modulo.controller";
import { ModuloServices } from "./modulo.services";
import { ModuloRepository } from "./modulo.repository";

@Module({
    controllers: [ModuloController],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([ModuloEntity])],
    providers: [ModuloServices, ModuloRepository],
})
export class ModuloModule {}
