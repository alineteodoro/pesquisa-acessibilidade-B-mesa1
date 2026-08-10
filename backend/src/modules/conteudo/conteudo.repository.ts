import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConteudoEntity } from "./conteudo.entity";
import { CriarConteudoRequestDto } from "./dto/requests/criar-conteudo-request.dto";
import { AtualizarConteudoRequestDto } from "./dto/requests/atualizar-conteudo-request.dto";
import { ConteudoOutputDto } from "./dto/io/conteudo-output.dto";
import { ConteudoDetailOutputDto } from "./dto/io/conteudo-detail-output.dto";

@Injectable()
export class ConteudoRepository {

    constructor(
        @InjectRepository(ConteudoEntity)
        private repo: Repository<ConteudoEntity>,
    ) {}

    async criarConteudo(params: CriarConteudoRequestDto): Promise<ConteudoOutputDto> {
        try {
            const data = await this.repo.insert(params);
            const [{ id_conteudo }] = data.identifiers;

            if (!id_conteudo) {
                throw new Error("Não foi possível gerar o ID do conteúdo.");
            }

            return {
                success: true,
                id: Number(id_conteudo),
                message: "Conteúdo criado com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao criar o conteúdo."
            };
        }
    }

    async buscarTodos(): Promise<ConteudoDetailOutputDto[]> {
        return await this.repo.find();
    }

    async buscarPorId(id_conteudo: number): Promise<ConteudoDetailOutputDto | null> {
        return await this.repo.findOne({ where: { id_conteudo } });
    }

    async atualizarConteudo(id_conteudo: number, params: AtualizarConteudoRequestDto): Promise<ConteudoOutputDto> {
        try {
            const result = await this.repo.update({ id_conteudo }, params);

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Conteúdo não encontrado para atualizar."
                };
            }

            return {
                success: true,
                message: "Conteúdo atualizado com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao atualizar o conteúdo."
            };
        }
    }

    async deletarConteudo(id_conteudo: number): Promise<ConteudoOutputDto> {
        try {
            const result = await this.repo.delete({ id_conteudo });

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Conteúdo não encontrado para exclusão."
                };
            }

            return {
                success: true,
                message: "Conteúdo excluído com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao excluir o conteúdo."
            };
        }
    }
}
