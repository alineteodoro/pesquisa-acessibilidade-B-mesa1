import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AvaliacaoCursoEntity } from "./avaliacao-curso.entity";
import { CriarAvaliacaoCursoRequestDto } from "./dto/requests/criar-avaliacao-curso-request.dto";
import { AtualizarAvaliacaoCursoRequestDto } from "./dto/requests/atualizar-avaliacao-curso-request.dto";
import { AvaliacaoCursoOutputDto } from "./dto/io/avaliacao-curso-output.dto";
import { AvaliacaoCursoDetailOutputDto } from "./dto/io/avaliacao-curso-detail-output.dto";
import { FindAvaliacaoCursoQueryDto } from "./dto/query-params/find-avaliacao-curso-query.dto";

@Injectable()
export class AvaliacaoCursoRepository {

    constructor(
        @InjectRepository(AvaliacaoCursoEntity)
        private repo: Repository<AvaliacaoCursoEntity>,
    ) {}

    async criarAvaliacaoCurso(params: CriarAvaliacaoCursoRequestDto): Promise<AvaliacaoCursoOutputDto> {
        try {
            const data = await this.repo.insert(params);
            const [{ id_avaliacao }] = data.identifiers;

            if (!id_avaliacao) {
                throw new Error("Não foi possível gerar o ID da avaliação.");
            }

            return {
                success: true,
                id: Number(id_avaliacao),
                message: "Avaliação criada com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao criar a avaliação."
            };
        }
    }

    async buscarTodos(query: FindAvaliacaoCursoQueryDto): Promise<AvaliacaoCursoDetailOutputDto[]> {
        const qb = this.repo.createQueryBuilder('a');

        if (query.id_curso !== undefined) {
            qb.innerJoin('matricula', 'm', 'm.id_matricula = a.id_matricula')
              .where('m.id_curso = :id_curso', { id_curso: query.id_curso });
        }

        if (query.id_matricula !== undefined) {
            qb.andWhere('a.id_matricula = :id_matricula', { id_matricula: query.id_matricula });
        }

        return await qb.getMany();
    }

    async buscarPorId(id_avaliacao: number): Promise<AvaliacaoCursoDetailOutputDto | null> {
        return await this.repo.findOne({ where: { id_avaliacao } });
    }

    async atualizarAvaliacaoCurso(id_avaliacao: number, params: AtualizarAvaliacaoCursoRequestDto): Promise<AvaliacaoCursoOutputDto> {
        try {
            const result = await this.repo.update({ id_avaliacao }, params);

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Avaliação não encontrada para atualizar."
                };
            }

            return {
                success: true,
                message: "Avaliação atualizada com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao atualizar a avaliação."
            };
        }
    }

    async deletarAvaliacaoCurso(id_avaliacao: number): Promise<AvaliacaoCursoOutputDto> {
        try {
            const result = await this.repo.delete({ id_avaliacao });

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Avaliação não encontrada para exclusão."
                };
            }

            return {
                success: true,
                message: "Avaliação excluída com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao excluir a avaliação."
            };
        }
    }
}
