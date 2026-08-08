import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProgressoEntity } from "./progresso.entity";
import { ProgressoController } from "./progresso.controller";
import { ProgressoServices } from "./progresso.services";
import { ProgressoRepository } from "./progresso.repository";

@Module({
    controllers:[ProgressoController],
    exports:[TypeOrmModule],
    imports:[TypeOrmModule.forFeature([ProgressoEntity])],
    providers:[ProgressoServices, ProgressoRepository],
})
export class ProgressoModule{}
