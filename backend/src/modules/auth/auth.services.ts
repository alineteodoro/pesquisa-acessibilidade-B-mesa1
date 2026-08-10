import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { CriarContaInputDto } from "./dto/io/criar-conta-input.dto";
import { HashService } from "src/utils/hash-service";
import { CriarContaOutputDto } from "./dto/io/criar-conta-output.dto";
import { LogarContaInputDto } from "./dto/io/logar-conta-input.dto";
import { LogarContaOutputDto } from "./dto/io/logar-conta-output.dto";
import { ContaOutputDto } from "./dto/io/conta-output.dto";
import { ContaDetailOutputDto } from "./dto/io/conta-detail-output.dto";
import { AtualizarContaRequestDto } from "./dto/requests/atualizar-conta-request.dto";
import { FindContaQueryDto } from "./dto/query-params/find-conta-query.dto";

@Injectable()
export class AuthServices {

    constructor(
        private repo: AuthRepository
    ) {}

    private hashService = new HashService();

    async buscarTodos(query: FindContaQueryDto): Promise<ContaDetailOutputDto[]> {
        return await this.repo.buscarTodos(query);
    }

    async buscarPorId(id: number): Promise<ContaDetailOutputDto | null> {
        return await this.repo.buscarPorId(id);
    }

    async criarConta(params: CriarContaInputDto): Promise<CriarContaOutputDto> {
        if (typeof params.dt_nascimento === "string") {
            const [day, month, year] = params.dt_nascimento.split("-").map(Number);
            params.dt_nascimento = new Date(Date.UTC(year, month - 1, day + 1));
        }

        params.senha_hash = this.hashService.hashar(params.senha_hash);

        return await this.repo.criarConta(params);
    }

    async logarConta(params: LogarContaInputDto): Promise<LogarContaOutputDto> {
        params.senha_hash = this.hashService.hashar(params.senha_hash);
        return await this.repo.logarConta(params);
    }

    async atualizarConta(id: number, params: AtualizarContaRequestDto): Promise<ContaOutputDto> {
        if (params.senha_hash) {
            params.senha_hash = this.hashService.hashar(params.senha_hash);
        }

        if (params.dt_nascimento && typeof params.dt_nascimento === "string") {
            const [day, month, year] = params.dt_nascimento.split("-").map(Number);
            params.dt_nascimento = new Date(Date.UTC(year, month - 1, day + 1)).toISOString();
        }

        return await this.repo.atualizarConta(id, params);
    }

    async deletarConta(id: number): Promise<ContaOutputDto> {
        return await this.repo.deletarConta(id);
    }
}