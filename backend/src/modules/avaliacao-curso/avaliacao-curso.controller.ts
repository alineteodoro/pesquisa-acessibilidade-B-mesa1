import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AvaliacaoCursoServices } from "./avaliacao-curso.services";
import { CriarAvaliacaoCursoRequestDto } from "./dto/requests/criar-avaliacao-curso-request.dto";
import { AtualizarAvaliacaoCursoRequestDto } from "./dto/requests/atualizar-avaliacao-curso-request.dto";
import { AvaliacaoCursoOutputDto } from "./dto/io/avaliacao-curso-output.dto";
import { AvaliacaoCursoDetailOutputDto } from "./dto/io/avaliacao-curso-detail-output.dto";

@Controller("api/avaliacao-curso")
export class AvaliacaoCursoController {

    constructor(
        private repo: AvaliacaoCursoServices
    ){}

    @Get()
    async buscarTodos(): Promise<AvaliacaoCursoDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    @Get(":id")
    async buscarPorId(
        @Param("id") id: string
    ): Promise<AvaliacaoCursoDetailOutputDto | null> {
        return await this.repo.buscarPorId(Number(id));
    }

    @Post()
    async criarAvaliacaoCurso(
        @Body() params: CriarAvaliacaoCursoRequestDto
    ): Promise<AvaliacaoCursoOutputDto> {
        return await this.repo.criarAvaliacaoCurso(params);
    }

    @Put(":id")
    async atualizarAvaliacaoCurso(
        @Param("id") id: string,
        @Body() params: AtualizarAvaliacaoCursoRequestDto
    ): Promise<AvaliacaoCursoOutputDto> {
        return await this.repo.atualizarAvaliacaoCurso(Number(id), params);
    }

    @Delete(":id")
    async deletarAvaliacaoCurso(
        @Param("id") id: string
    ): Promise<AvaliacaoCursoOutputDto> {
        return await this.repo.deletarAvaliacaoCurso(Number(id));
    }
}
