import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CursoServices } from "./curso.services";
import { CriarCursoRequestDto } from "./dto/requests/criar-curso-request.dto";
import { AtualizarCursoRequestDto } from "./dto/requests/atualizar-curso-request.dto";
import { CursoOutputDto } from "./dto/io/curso-output.dto";
import { CursoDetailOutputDto } from "./dto/io/curso-detail-output.dto";
import { Public } from '../../security/public.decorator';

@Controller("api/curso")
export class CursoController {

    constructor(
        private repo: CursoServices
    ){}

    @Public()
    @Get()
    async buscarTodos(): Promise<CursoDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    @Public()
    @Get(":id")
    async buscarPorId(
        @Param("id") id: string
    ): Promise<CursoDetailOutputDto | null> {
        return await this.repo.buscarPorId(Number(id));
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
