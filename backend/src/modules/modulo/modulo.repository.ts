import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ModuloEntity } from "./modulo.entity";
import { CriarModuloRequestDto } from "./dto/requests/criar-modulo-request.dto";
import { AtualizarModuloRequestDto } from "./dto/requests/atualizar-modulo-request.dto";
import { ModuloOutputDto } from "./dto/io/modulo-output.dto";
import { ModuloDetailOutputDto } from "./dto/io/modulo-detail-output.dto";

@Injectable()
export class ModuloRepository {

    constructor(
        @InjectRepository(ModuloEntity)
        private repo: Repository<ModuloEntity>,
    ) {}

    async criarModulo(params: CriarModuloRequestDto): Promise<ModuloOutputDto> {
        try {
            const data = await this.repo.insert(params);
            const [{ id_modulo }] = data.identifiers;

            if (!id_modulo) {
                throw new Error("Não foi possível gerar o ID do módulo.");
            }

            return {
                success: true,
                id: Number(id_modulo),
                message: "Módulo criado com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao criar o módulo."
            };
        }
    }

    async buscarTodos(): Promise<ModuloDetailOutputDto[]> {
        return await this.repo.find();
    }

    async buscarPorId(id_modulo: number): Promise<ModuloDetailOutputDto | null> {
        return await this.repo.findOne({ where: { id_modulo } });
    }

    async atualizarModulo(id_modulo: number, params: AtualizarModuloRequestDto): Promise<ModuloOutputDto> {
        try {
            const result = await this.repo.update({ id_modulo }, params);

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Módulo não encontrado para atualizar."
                };
            }

            return {
                success: true,
                message: "Módulo atualizado com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao atualizar o módulo."
            };
        }
    }

    async deletarModulo(id_modulo: number): Promise<ModuloOutputDto> {
        try {
            const result = await this.repo.delete({ id_modulo });

            if (result.affected === 0) {
                return {
                    success: false,
                    message: "Módulo não encontrado para exclusão."
                };
            }

            return {
                success: true,
                message: "Módulo excluído com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao excluir o módulo."
            };
        }
    }
}
