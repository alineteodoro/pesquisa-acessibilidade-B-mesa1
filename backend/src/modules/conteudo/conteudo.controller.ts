import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ConteudoServices } from "./conteudo.services";
import { CriarConteudoRequestDto } from "./dto/requests/criar-conteudo-request.dto";
import { AtualizarConteudoRequestDto } from "./dto/requests/atualizar-conteudo-request.dto";
import { ConteudoOutputDto } from "./dto/io/conteudo-output.dto";
import { ConteudoDetailOutputDto } from "./dto/io/conteudo-detail-output.dto";

@Controller("api/conteudo")
export class ConteudoController {

    constructor(
        private repo: ConteudoServices
    ){}

    @Get()
    async buscarTodos(): Promise<ConteudoDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    @Get(":id")
    async buscarPorId(
        @Param("id") id: string
    ): Promise<ConteudoDetailOutputDto | null> {
        return await this.repo.buscarPorId(Number(id));
    }

    @Post()
    async criarConteudo(
        @Body() params: CriarConteudoRequestDto
    ): Promise<ConteudoOutputDto> {
        return await this.repo.criarConteudo(params);
    }

    @Put(":id")
    async atualizarConteudo(
        @Param("id") id: string,
        @Body() params: AtualizarConteudoRequestDto
    ): Promise<ConteudoOutputDto> {
        return await this.repo.atualizarConteudo(Number(id), params);
    }

    @Delete(":id")
    async deletarConteudo(
        @Param("id") id: string
    ): Promise<ConteudoOutputDto> {
        return await this.repo.deletarConteudo(Number(id));
    }
}
