import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProgressoEntity } from "./progresso.entity";
import { CriarProgressoRequestDto } from "./dto/requests/criar-progresso-request.dto";
import { AtualizarProgressoRequestDto } from "./dto/requests/atualizar-progresso-request.dto";
import { ProgressoOutputDto } from "./dto/io/progresso-output.dto";
import { ProgressoDetailOutputDto } from "./dto/io/progresso-detail-output.dto";

@Injectable()
export class ProgressoRepository {

    constructor(
        @InjectRepository(ProgressoEntity)
        private repo: Repository<ProgressoEntity>,
    ) {}

    async criarProgresso(params: CriarProgressoRequestDto): Promise<ProgressoOutputDto> {
        try {
            const data = await this.repo.insert(params);
            const [{ id_progresso }] = data.identifiers;

            if (!id_progresso) {
                throw new Error("Não foi possível gerar o ID do progresso.");
            }

            return {
                success: true,
                id: Number(id_progresso),
                message: "Progresso criado com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao criar o progresso."
            };
        }
    }

    async buscarTodos(): Promise<ProgressoDetailOutputDto[]> {
        return await this.repo.find();
    }

    async buscarPorId(id_progresso: number): Promise<ProgressoDetailOutputDto | null> {
        return await this.repo.findOne({ where: { id_progresso } });
    }

    async atualizarProgresso(id_progresso: number, params: AtualizarProgressoRequestDto): Promise<ProgressoOutputDto> {
        try {
            const result = await this.repo.update({ id_progresso }, params);

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Progresso não encontrado para atualizar."
                };
            }

            return {
                success: true,
                message: "Progresso atualizado com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao atualizar o progresso."
            };
        }
    }

    async deletarProgresso(id_progresso: number): Promise<ProgressoOutputDto> {
        try {
            const result = await this.repo.delete({ id_progresso });

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Progresso não encontrado para exclusão."
                };
            }

            return {
                success: true,
                message: "Progresso excluído com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao excluir o progresso."
            };
        }
    }
}
