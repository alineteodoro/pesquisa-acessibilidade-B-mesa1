import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AulaEntity } from "./aula.entity";
import { AulaController } from "./aula.controller";
import { AulaServices } from "./aula.services";
import { AulaRepository } from "./aula.repository";

@Module({
    controllers: [AulaController],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([AulaEntity])],
    providers: [AulaServices, AulaRepository],
})
export class AulaModule {}
