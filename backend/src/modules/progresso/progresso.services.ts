import { Injectable } from "@nestjs/common";
import { ProgressoRepository } from "./progresso.repository";
import { CriarProgressoRequestDto } from "./dto/requests/criar-progresso-request.dto";
import { AtualizarProgressoRequestDto } from "./dto/requests/atualizar-progresso-request.dto";
import { ProgressoOutputDto } from "./dto/io/progresso-output.dto";
import { ProgressoDetailOutputDto } from "./dto/io/progresso-detail-output.dto";

@Injectable()
export class ProgressoServices {

    constructor(
        private repo: ProgressoRepository
    ){}

    async criarProgresso(params: CriarProgressoRequestDto): Promise<ProgressoOutputDto> {
        if (typeof params.dt_conclusao === "string") {
            params.dt_conclusao = new Date(params.dt_conclusao);
        }

        return await this.repo.criarProgresso(params);
    }

    async buscarTodos(): Promise<ProgressoDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    async buscarPorId(id_progresso: number): Promise<ProgressoDetailOutputDto | null> {
        return await this.repo.buscarPorId(id_progresso);
    }

    async atualizarProgresso(id_progresso: number, params: AtualizarProgressoRequestDto): Promise<ProgressoOutputDto> {
        if (typeof params.dt_conclusao === "string") {
            params.dt_conclusao = new Date(params.dt_conclusao);
        }

        return await this.repo.atualizarProgresso(id_progresso, params);
    }

    async deletarProgresso(id_progresso: number): Promise<ProgressoOutputDto> {
        return await this.repo.deletarProgresso(id_progresso);
    }
}
