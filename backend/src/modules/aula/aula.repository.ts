import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AulaEntity } from "./aula.entity";
import { CriarAulaRequestDto } from "./dto/requests/criar-aula-request.dto";
import { AtualizarAulaRequestDto } from "./dto/requests/atualizar-aula-request.dto";
import { AulaOutputDto } from "./dto/io/aula-output.dto";
import { AulaDetailOutputDto } from "./dto/io/aula-detail-output.dto";

@Injectable()
export class AulaRepository {

    constructor(
        @InjectRepository(AulaEntity)
        private repo: Repository<AulaEntity>,
    ) {}

    async criarAula(params: CriarAulaRequestDto): Promise<AulaOutputDto> {
        try {
            const data = await this.repo.insert(params);
            const [{ id_aula }] = data.identifiers;

            if (!id_aula) {
                throw new Error("Não foi possível gerar o ID da aula.");
            }

            return {
                success: true,
                id: Number(id_aula),
                message: "Aula criada com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao criar a aula."
            };
        }
    }

    async buscarTodos(): Promise<AulaDetailOutputDto[]> {
        return await this.repo.find();
    }

    async buscarPorId(id_aula: number): Promise<AulaDetailOutputDto | null> {
        return await this.repo.findOne({ where: { id_aula } });
    }

    async atualizarAula(id_aula: number, params: AtualizarAulaRequestDto): Promise<AulaOutputDto> {
        try {
            const result = await this.repo.update({ id_aula }, params);

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Aula não encontrada para atualizar."
                };
            }

            return {
                success: true,
                message: "Aula atualizada com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao atualizar a aula."
            };
        }
    }

    async deletarAula(id_aula: number): Promise<AulaOutputDto> {
        try {
            const result = await this.repo.delete({ id_aula });

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Aula não encontrada para exclusão."
                };
            }

            return {
                success: true,
                message: "Aula excluída com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao excluir a aula."
            };
        }
    }
}
