import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProgressoServices } from "./progresso.services";
import { CriarProgressoRequestDto } from "./dto/requests/criar-progresso-request.dto";
import { AtualizarProgressoRequestDto } from "./dto/requests/atualizar-progresso-request.dto";
import { ProgressoOutputDto } from "./dto/io/progresso-output.dto";
import { ProgressoDetailOutputDto } from "./dto/io/progresso-detail-output.dto";

@Controller("api/progresso")
export class ProgressoController {

    constructor(
        private repo: ProgressoServices
    ){}

    @Get()
    async buscarTodos(): Promise<ProgressoDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    @Get(":id")
    async buscarPorId(
        @Param("id") id: string
    ): Promise<ProgressoDetailOutputDto | null> {
        return await this.repo.buscarPorId(Number(id));
    }

    @Post()
    async criarProgresso(
        @Body() params: CriarProgressoRequestDto
    ): Promise<ProgressoOutputDto> {
        return await this.repo.criarProgresso(params);
    }

    @Put(":id")
    async atualizarProgresso(
        @Param("id") id: string,
        @Body() params: AtualizarProgressoRequestDto
    ): Promise<ProgressoOutputDto> {
        return await this.repo.atualizarProgresso(Number(id), params);
    }

    @Delete(":id")
    async deletarProgresso(
        @Param("id") id: string
    ): Promise<ProgressoOutputDto> {
        return await this.repo.deletarProgresso(Number(id));
    }
}
