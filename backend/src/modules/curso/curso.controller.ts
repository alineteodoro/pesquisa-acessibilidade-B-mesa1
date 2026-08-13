import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CursoServices } from "./curso.services";
import { CriarCursoRequestDto } from "./dto/requests/criar-curso-request.dto";
import { AtualizarCursoRequestDto } from "./dto/requests/atualizar-curso-request.dto";
import { CursoOutputDto } from "./dto/io/curso-output.dto";
import { CursoDetailOutputDto } from "./dto/io/curso-detail-output.dto";
import { CursoFindInstrutorOutputDto } from "./dto/io/curso-find-instrutor-output.dto";

@Controller("api/curso")
export class CursoController {

    constructor(
        private repo: CursoServices
    ){}

    @Get()
    async buscarTodos(): Promise<CursoDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    @Get(":id")
    async buscarPorId(
        @Param("id") id: string
    ): Promise<CursoDetailOutputDto | null> {
        return await this.repo.buscarPorId(Number(id));
    }

    @Get("instrutor/:id_curso")
    async buscarInstrutorPorCurso(
        @Param("id_curso") id_curso: string
    ): Promise<CursoFindInstrutorOutputDto> {
        return await this.repo.buscarInstrutorPorCurso(Number(id_curso));
    }

    @Post()
    async criarCurso(
        @Body() params: CriarCursoRequestDto
    ): Promise<CursoOutputDto> {
        return await this.repo.criarCurso(params);
    }

    @Put(":id")
    async atualizarCurso(
        @Param("id") id: string,
        @Body() params: AtualizarCursoRequestDto
    ): Promise<CursoOutputDto> {
        return await this.repo.atualizarCurso(Number(id), params);
    }

    @Delete(":id")
    async deletarCurso(
        @Param("id") id: string
    ): Promise<CursoOutputDto> {
        return await this.repo.deletarCurso(Number(id));
    }
}
