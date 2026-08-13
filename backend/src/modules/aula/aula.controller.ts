import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AulaServices } from "./aula.services";
import { CriarAulaRequestDto } from "./dto/requests/criar-aula-request.dto";
import { AtualizarAulaRequestDto } from "./dto/requests/atualizar-aula-request.dto";
import { AulaOutputDto } from "./dto/io/aula-output.dto";
import { AulaDetailOutputDto } from "./dto/io/aula-detail-output.dto";

@ApiTags("Aula")
@Controller("api/aula")
export class AulaController {

    constructor(
        private repo: AulaServices
    ){}

    @Get()
    async buscarTodos(): Promise<AulaDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    @Get(":id")
    async buscarPorId(
        @Param("id") id: string
    ): Promise<AulaDetailOutputDto | null> {
        return await this.repo.buscarPorId(Number(id));
    }

    @Post()
    async criarAula(
        @Body() params: CriarAulaRequestDto
    ): Promise<AulaOutputDto> {
        return await this.repo.criarAula(params);
    }

    @Put(":id")
    async atualizarAula(
        @Param("id") id: string,
        @Body() params: AtualizarAulaRequestDto
    ): Promise<AulaOutputDto> {
        return await this.repo.atualizarAula(Number(id), params);
    }

    @Delete(":id")
    async deletarAula(
        @Param("id") id: string
    ): Promise<AulaOutputDto> {
        return await this.repo.deletarAula(Number(id));
    }
}
