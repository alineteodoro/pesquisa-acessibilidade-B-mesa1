import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CursoEntity } from "./curso.entity";
import { CriarCursoRequestDto } from "./dto/requests/criar-curso-request.dto";
import { AtualizarCursoRequestDto } from "./dto/requests/atualizar-curso-request.dto";
import { CursoOutputDto } from "./dto/io/curso-output.dto";
import { CursoDetailOutputDto } from "./dto/io/curso-detail-output.dto";

@Injectable()
export class CursoRepository {

    constructor(
        @InjectRepository(CursoEntity)
        private repo: Repository<CursoEntity>,
    ) {}

    async criarCurso(params: CriarCursoRequestDto): Promise<CursoOutputDto> {
        try {
            const data = await this.repo.insert(params);
            const [{ id_curso }] = data.identifiers;

            if (!id_curso) {
                throw new Error("Não foi possível gerar o ID do curso.");
            }

            return {
                success: true,
                id: Number(id_curso),
                message: "Curso criado com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao criar o curso."
            };
        }
    }

    async buscarTodos(): Promise<CursoDetailOutputDto[]> {
        return await this.repo.find();
    }

    async buscarPorId(id_curso: number): Promise<CursoDetailOutputDto | null> {
        return await this.repo.findOne({ where: { id_curso } });
    }

    async atualizarCurso(id_curso: number, params: AtualizarCursoRequestDto): Promise<CursoOutputDto> {
        try {
            const result = await this.repo.update({ id_curso }, params);

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Curso não encontrado para atualizar."
                };
            }

            return {
                success: true,
                message: "Curso atualizado com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao atualizar o curso."
            };
        }
    }

    async deletarCurso(id_curso: number): Promise<CursoOutputDto> {
        try {
            const result = await this.repo.delete({ id_curso });

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Curso não encontrado para exclusão."
                };
            }

            return {
                success: true,
                message: "Curso excluído com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao excluir o curso."
            };
        }
    }
}
