import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ModuloServices } from "./modulo.services";
import { CriarModuloRequestDto } from "./dto/requests/criar-modulo-request.dto";
import { AtualizarModuloRequestDto } from "./dto/requests/atualizar-modulo-request.dto";
import { ModuloOutputDto } from "./dto/io/modulo-output.dto";
import { ModuloDetailOutputDto } from "./dto/io/modulo-detail-output.dto";

@Controller("api/modulo")
export class ModuloController {

    constructor(
        private repo: ModuloServices
    ){}

    @Get()
    async buscarTodos(): Promise<ModuloDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    @Get(":id")
    async buscarPorId(
        @Param("id") id: string
    ): Promise<ModuloDetailOutputDto | null> {
        return await this.repo.buscarPorId(Number(id));
    }

    @Post()
    async criarModulo(
        @Body() params: CriarModuloRequestDto
    ): Promise<ModuloOutputDto> {
        return await this.repo.criarModulo(params);
    }

    @Put(":id")
    async atualizarModulo(
        @Param("id") id: string,
        @Body() params: AtualizarModuloRequestDto
    ): Promise<ModuloOutputDto> {
        return await this.repo.atualizarModulo(Number(id), params);
    }

    @Delete(":id")
    async deletarModulo(
        @Param("id") id: string
    ): Promise<ModuloOutputDto> {
        return await this.repo.deletarModulo(Number(id));
    }
}
