import { Injectable } from "@nestjs/common";
import { MatriculaRepository } from "./matricula.repository";
import { CriarMatriculaRequestDto } from "./dto/requests/criar-matricula-request.dto";
import { AtualizarMatriculaRequestDto } from "./dto/requests/atualizar-matricula-request.dto";
import { MatriculaOutputDto } from "./dto/io/matricula-output.dto";
import { MatriculaDetailOutputDto } from "./dto/io/matricula-detail-output.dto";
import { FindMatriculaQueryDto } from "./dto/query-params/find-matricula-query.dto";

@Injectable()
export class MatriculaServices {

    constructor(
        private repo: MatriculaRepository
    ){}

    async criarMatricula(params: CriarMatriculaRequestDto): Promise<MatriculaOutputDto> {
        if (typeof params.dt_matricula === "string") {
            params.dt_matricula = new Date(params.dt_matricula);
        }

        return await this.repo.criarMatricula(params);
    }

    async buscarTodos(query: FindMatriculaQueryDto): Promise<MatriculaDetailOutputDto[]> {
        return await this.repo.buscarTodos(query);
    }

    async buscarPorId(id_matricula: number): Promise<MatriculaDetailOutputDto | null> {
        return await this.repo.buscarPorId(id_matricula);
    }

    async atualizarMatricula(id_matricula: number, params: AtualizarMatriculaRequestDto): Promise<MatriculaOutputDto> {
        if (typeof params.dt_matricula === "string") {
            params.dt_matricula = new Date(params.dt_matricula);
        }

        return await this.repo.atualizarMatricula(id_matricula, params);
    }

    async deletarMatricula(id_matricula: number): Promise<MatriculaOutputDto> {
        return await this.repo.deletarMatricula(id_matricula);
    }
}
