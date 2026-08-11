import { Injectable } from "@nestjs/common";
import { AulaRepository } from "./aula.repository";
import { CriarAulaRequestDto } from "./dto/requests/criar-aula-request.dto";
import { AtualizarAulaRequestDto } from "./dto/requests/atualizar-aula-request.dto";
import { AulaOutputDto } from "./dto/io/aula-output.dto";
import { AulaDetailOutputDto } from "./dto/io/aula-detail-output.dto";

@Injectable()
export class AulaServices {

    constructor(
        private repo: AulaRepository
    ){}

    async criarAula(params: CriarAulaRequestDto): Promise<AulaOutputDto> {
        return await this.repo.criarAula(params);
    }

    async buscarTodos(): Promise<AulaDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    async buscarPorId(id_aula: number): Promise<AulaDetailOutputDto | null> {
        return await this.repo.buscarPorId(id_aula);
    }

    async atualizarAula(id_aula: number, params: AtualizarAulaRequestDto): Promise<AulaOutputDto> {
        return await this.repo.atualizarAula(id_aula, params);
    }

    async deletarAula(id_aula: number): Promise<AulaOutputDto> {
        return await this.repo.deletarAula(id_aula);
    }
}
