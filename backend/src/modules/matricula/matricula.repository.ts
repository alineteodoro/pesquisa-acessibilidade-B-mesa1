import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MatriculaEntity } from "./matricula.entity";
import { CriarMatriculaRequestDto } from "./dto/requests/criar-matricula-request.dto";
import { AtualizarMatriculaRequestDto } from "./dto/requests/atualizar-matricula-request.dto";
import { MatriculaOutputDto } from "./dto/io/matricula-output.dto";
import { MatriculaDetailOutputDto } from "./dto/io/matricula-detail-output.dto";

@Injectable()
export class MatriculaRepository {

    constructor(
        @InjectRepository(MatriculaEntity)
        private repo: Repository<MatriculaEntity>,
    ) {}

    async criarMatricula(params: CriarMatriculaRequestDto): Promise<MatriculaOutputDto> {
        try {
            const data = await this.repo.insert(params);
            const [{ id_matricula }] = data.identifiers;

            if (!id_matricula) {
                throw new Error("Não foi possível gerar o ID da matrícula.");
            }

            return {
                success: true,
                id: Number(id_matricula),
                message: "Matrícula criada com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao criar a matrícula."
            };
        }
    }

    async buscarTodos(): Promise<MatriculaDetailOutputDto[]> {
        return await this.repo.find();
    }

    async buscarPorId(id_matricula: number): Promise<MatriculaDetailOutputDto | null> {
        return await this.repo.findOne({ where: { id_matricula } });
    }

    async atualizarMatricula(id_matricula: number, params: AtualizarMatriculaRequestDto): Promise<MatriculaOutputDto> {
        try {
            const result = await this.repo.update({ id_matricula }, params);

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Matrícula não encontrada para atualizar."
                };
            }

            return {
                success: true,
                message: "Matrícula atualizada com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao atualizar a matrícula."
            };
        }
    }

    async deletarMatricula(id_matricula: number): Promise<MatriculaOutputDto> {
        try {
            const result = await this.repo.delete({ id_matricula });

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Matrícula não encontrada para exclusão."
                };
            }

            return {
                success: true,
                message: "Matrícula excluída com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao excluir a matrícula."
            };
        }
    }
}
