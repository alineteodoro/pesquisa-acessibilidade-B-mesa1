import { Injectable } from "@nestjs/common";
import { AvaliacaoCursoRepository } from "./avaliacao-curso.repository";
import { CriarAvaliacaoCursoRequestDto } from "./dto/requests/criar-avaliacao-curso-request.dto";
import { AtualizarAvaliacaoCursoRequestDto } from "./dto/requests/atualizar-avaliacao-curso-request.dto";
import { AvaliacaoCursoOutputDto } from "./dto/io/avaliacao-curso-output.dto";
import { AvaliacaoCursoDetailOutputDto } from "./dto/io/avaliacao-curso-detail-output.dto";

@Injectable()
export class AvaliacaoCursoServices {

    constructor(
        private repo: AvaliacaoCursoRepository
    ){}

    async criarAvaliacaoCurso(params: CriarAvaliacaoCursoRequestDto): Promise<AvaliacaoCursoOutputDto> {
        if (typeof params.dt_avaliacao === "string") {
            params.dt_avaliacao = new Date(params.dt_avaliacao);
        }

        return await this.repo.criarAvaliacaoCurso(params);
    }

    async buscarTodos(): Promise<AvaliacaoCursoDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    async buscarPorId(id_avaliacao: number): Promise<AvaliacaoCursoDetailOutputDto | null> {
        return await this.repo.buscarPorId(id_avaliacao);
    }

    async atualizarAvaliacaoCurso(id_avaliacao: number, params: AtualizarAvaliacaoCursoRequestDto): Promise<AvaliacaoCursoOutputDto> {
        if (typeof params.dt_avaliacao === "string") {
            params.dt_avaliacao = new Date(params.dt_avaliacao);
        }

        return await this.repo.atualizarAvaliacaoCurso(id_avaliacao, params);
    }

    async deletarAvaliacaoCurso(id_avaliacao: number): Promise<AvaliacaoCursoOutputDto> {
        return await this.repo.deletarAvaliacaoCurso(id_avaliacao);
    }
}
