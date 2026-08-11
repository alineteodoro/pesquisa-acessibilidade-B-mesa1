import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthServices } from "./auth.services";
import { CriarContaRequestDto } from "./dto/requests/criar-conta-request.dto";
import { CriarContaOutputDto } from "./dto/io/criar-conta-output.dto";
import { LogarContaRequestDto } from "./dto/requests/logar-conta-request.dto";
import { LogarContaOutputDto } from "./dto/io/logar-conta-output.dto";
import { ContaOutputDto } from "./dto/io/conta-output.dto";
import { ContaDetailOutputDto } from "./dto/io/conta-detail-output.dto";
import { AtualizarContaRequestDto } from "./dto/requests/atualizar-conta-request.dto";
import { DeletarContaParamsDto } from "./dto/params/deletar-conta-params.dto";
import { FindContaQueryDto } from "./dto/query-params/find-conta-query.dto";
import { Public } from '../../security/public.decorator';

@ApiTags("Auth")
@Controller("api/auth")
export class AuthController {

    constructor(
        private repo: AuthServices
    ) {}

    @Get()
    @ApiOperation({ summary: "Listar contas" })
    @ApiResponse({ status: 200, description: "Lista de contas retornada com sucesso." })
    @ApiQuery({ name: "nome", required: false, type: String })
    @ApiQuery({ name: "email", required: false, type: String })
    @ApiQuery({ name: "ativo", required: false, type: Boolean })
    async buscarTodos(@Query() query: FindContaQueryDto): Promise<ContaDetailOutputDto[]> {
        return await this.repo.buscarTodos(query);
    }

    @Get(":id")
    @ApiOperation({ summary: "Buscar conta por ID" })
    @ApiParam({ name: "id", type: Number, description: "ID da conta" })
    @ApiResponse({ status: 200, description: "Conta retornada com sucesso." })
    async buscarPorId(@Param() params: DeletarContaParamsDto): Promise<ContaDetailOutputDto | null> {
        return await this.repo.buscarPorId(params.id);
    }

    @Public()
    @Post("criarConta")
    @ApiOperation({ summary: "Criar conta" })
    @ApiBody({ type: CriarContaRequestDto })
    @ApiResponse({ status: 201, description: "Conta criada com sucesso." })
    async criarConta(@Body() params: CriarContaRequestDto): Promise<CriarContaOutputDto> {
        return await this.repo.criarConta(params);
    }

    @Public()
    @Post("logarConta")
    @ApiOperation({ summary: "Login da conta" })
    @ApiBody({ type: LogarContaRequestDto })
    @ApiResponse({ status: 200, description: "Login realizado com sucesso." })
    async logarConta(@Body() params: LogarContaRequestDto): Promise<LogarContaOutputDto> {
        return await this.repo.logarConta(params);
    }

    @Put(":id")
    @ApiOperation({ summary: "Atualizar conta" })
    @ApiParam({ name: "id", type: Number, description: "ID da conta" })
    @ApiBody({ type: AtualizarContaRequestDto })
    @ApiResponse({ status: 200, description: "Conta atualizada com sucesso." })
    async atualizarConta(@Param() params: DeletarContaParamsDto, @Body() body: AtualizarContaRequestDto): Promise<ContaOutputDto> {
        return await this.repo.atualizarConta(params.id, body);
    }

    @Delete(":id")
    @ApiOperation({ summary: "Excluir conta" })
    @ApiParam({ name: "id", type: Number, description: "ID da conta" })
    @ApiResponse({ status: 200, description: "Conta removida com sucesso." })
    async deletarConta(@Param() params: DeletarContaParamsDto): Promise<ContaOutputDto> {
        return await this.repo.deletarConta(params.id);
    }
}
