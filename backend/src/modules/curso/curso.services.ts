import { Injectable } from "@nestjs/common";
import { CursoRepository } from "./curso.repository";
import { CriarCursoRequestDto } from "./dto/requests/criar-curso-request.dto";
import { AtualizarCursoRequestDto } from "./dto/requests/atualizar-curso-request.dto";
import { CursoOutputDto } from "./dto/io/curso-output.dto";
import { CursoDetailOutputDto } from "./dto/io/curso-detail-output.dto";

@Injectable()
export class CursoServices {

    constructor(
        private repo: CursoRepository
    ){}

    async criarCurso(params: CriarCursoRequestDto): Promise<CursoOutputDto> {
        return await this.repo.criarCurso(params);
    }

    async buscarTodos(): Promise<CursoDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    async buscarPorId(id_curso: number): Promise<CursoDetailOutputDto | null> {
        return await this.repo.buscarPorId(id_curso);
    }

    async atualizarCurso(id_curso: number, params: AtualizarCursoRequestDto): Promise<CursoOutputDto> {
        return await this.repo.atualizarCurso(id_curso, params);
    }

    async deletarCurso(id_curso: number): Promise<CursoOutputDto> {
        return await this.repo.deletarCurso(id_curso);
    }
}
