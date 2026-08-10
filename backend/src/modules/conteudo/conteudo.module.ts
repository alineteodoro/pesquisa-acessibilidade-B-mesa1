import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConteudoEntity } from "./conteudo.entity";
import { ConteudoController } from "./conteudo.controller";
import { ConteudoServices } from "./conteudo.services";
import { ConteudoRepository } from "./conteudo.repository";

@Module({
    controllers: [ConteudoController],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([ConteudoEntity])],
    providers: [ConteudoServices, ConteudoRepository],
})
export class ConteudoModule {}
