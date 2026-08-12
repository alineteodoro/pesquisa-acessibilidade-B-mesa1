import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { CriarContaInputDto } from "./dto/io/criar-conta-input.dto";
import { CriarContaOutputDto } from "./dto/io/criar-conta-output.dto";
import { LogarContaInputDto } from "./dto/io/logar-conta-input.dto";
import { LogarContaOutputDto } from "./dto/io/logar-conta-output.dto";
import { ContaOutputDto } from "./dto/io/conta-output.dto";
import { ContaDetailOutputDto } from "./dto/io/conta-detail-output.dto";
import { AtualizarContaRequestDto } from "./dto/requests/atualizar-conta-request.dto";
import { FindContaQueryDto } from "./dto/query-params/find-conta-query.dto";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthServices {

    constructor(
        private repo: AuthRepository,
        private jwtService: JwtService,
    ) {}

    async buscarTodos(query: FindContaQueryDto): Promise<ContaDetailOutputDto[]> {
        return await this.repo.buscarTodos(query);
    }

    async buscarPorId(id: number): Promise<ContaDetailOutputDto | null> {
        return await this.repo.buscarPorId(id);
    }

    private normalizarDataNascimento(value: Date | string): Date {
        if (value instanceof Date) return value;

        if (typeof value !== 'string') {
            throw new Error('A data de nascimento é inválida.');
        }

        const texto = value.trim();

        const iso = /^\d{4}-\d{2}-\d{2}$/.exec(texto);
        if (iso) {
            const [year, month, day] = texto.split('-').map(Number);
            return new Date(Date.UTC(year, month - 1, day));
        }

        const brasil = /^\d{2}-\d{2}-\d{4}$/.exec(texto);
        if (brasil) {
            const [day, month, year] = texto.split('-').map(Number);
            return new Date(Date.UTC(year, month - 1, day));
        }

        throw new Error('A data de nascimento deve estar no formato yyyy-mm-dd ou dd-mm-yyyy.');
    }

    async criarConta(params: CriarContaInputDto): Promise<CriarContaOutputDto> {
        params.dt_nascimento = this.normalizarDataNascimento(params.dt_nascimento);
        params.senha_hash = await bcrypt.hash(params.senha_hash, 12);

        return await this.repo.criarConta(params);
    }

    async logarConta(params: LogarContaInputDto): Promise<LogarContaOutputDto> {
        const conta = await this.repo.buscarPorEmail(params.email);
        if (!conta || !(await bcrypt.compare(params.senha_hash, conta.senha_hash))) {
            return { success: false, message: 'Usuário ou senha inválidos.' };
        }
        return {
            success: true,
            message: 'Usuário logado com sucesso.',
            is_instrutor: conta.is_instrutor,
            token: await this.jwtService.signAsync({ sub: conta.id_usuario, email: conta.email, is_instrutor: conta.is_instrutor }),
            usuario: { id_usuario: conta.id_usuario, nome: conta.nome, email: conta.email, is_instrutor: conta.is_instrutor },
        };
    }

    async atualizarConta(id: number, params: AtualizarContaRequestDto): Promise<ContaOutputDto> {
        if (params.senha_hash) {
            params.senha_hash = await bcrypt.hash(params.senha_hash, 12);
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
