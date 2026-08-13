import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MatriculaServices } from "./matricula.services";
import { CriarMatriculaRequestDto } from "./dto/requests/criar-matricula-request.dto";
import { AtualizarMatriculaRequestDto } from "./dto/requests/atualizar-matricula-request.dto";
import { MatriculaOutputDto } from "./dto/io/matricula-output.dto";
import { MatriculaDetailOutputDto } from "./dto/io/matricula-detail-output.dto";
import { FindMatriculaQueryDto } from "./dto/query-params/find-matricula-query.dto";

@ApiTags("Matricula")
@Controller("api/matricula")
export class MatriculaController {

    constructor(
        private repo: MatriculaServices
    ){}

    @Get()
    async buscarTodos(@Query() query: FindMatriculaQueryDto): Promise<MatriculaDetailOutputDto[]> {
        return await this.repo.buscarTodos(query);
    }

    @Get(":id")
    async buscarPorId(
        @Param("id") id: string
    ): Promise<MatriculaDetailOutputDto | null> {
        return await this.repo.buscarPorId(Number(id));
    }

    @Post()
    async criarMatricula(
        @Body() params: CriarMatriculaRequestDto
    ): Promise<MatriculaOutputDto> {
        return await this.repo.criarMatricula(params);
    }

    @Put(":id")
    async atualizarMatricula(
        @Param("id") id: string,
        @Body() params: AtualizarMatriculaRequestDto
    ): Promise<MatriculaOutputDto> {
        return await this.repo.atualizarMatricula(Number(id), params);
    }

    @Delete(":id")
    async deletarMatricula(
        @Param("id") id: string
    ): Promise<MatriculaOutputDto> {
        return await this.repo.deletarMatricula(Number(id));
    }
}
