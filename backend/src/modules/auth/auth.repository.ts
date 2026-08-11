import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthEntity } from "./auth.entity";
import { CriarContaInputDto } from "./dto/io/criar-conta-input.dto";
import { CriarContaOutputDto } from "./dto/io/criar-conta-output.dto";
import { LogarContaInputDto } from "./dto/io/logar-conta-input.dto";
import { LogarContaOutputDto } from "./dto/io/logar-conta-output.dto";
import { ContaOutputDto } from "./dto/io/conta-output.dto";
import { ContaDetailOutputDto } from "./dto/io/conta-detail-output.dto";
import { AtualizarContaRequestDto } from "./dto/requests/atualizar-conta-request.dto";
import { FindContaQueryDto } from "./dto/query-params/find-conta-query.dto";

@Injectable()
export class AuthRepository {

    constructor(
        @InjectRepository(AuthEntity)
        private repo: Repository<AuthEntity>,
    ) {}

    async buscarTodos(query: FindContaQueryDto): Promise<ContaDetailOutputDto[]> {
        const where: any = {};

        if (query.nome) where.nome = query.nome;
        if (query.email) where.email = query.email;
        if (query.ativo !== undefined) where.ativo = query.ativo;

        return await this.repo.find({ where });
    }

    async buscarPorId(id: number): Promise<ContaDetailOutputDto | null> {
        return await this.repo.findOneBy({ id_usuario: id });
    }

    async criarConta(params: CriarContaInputDto): Promise<CriarContaOutputDto> {
        try {
            const data = await this.repo.insert(params);
            const [{ id_usuario }] = data.identifiers;

            if (!id_usuario) {
                throw new Error("Não foi possível gerar o ID da conta.");
            }

            return {
                success: true,
                id: Number(id_usuario),
                message: "Conta criada com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao criar a conta."
            };
        }
    }

    async logarConta(params: LogarContaInputDto): Promise<LogarContaOutputDto> {
        try {
            const data = await this.repo.find({ where: { email: params.email, senha_hash: params.senha_hash } });

            if (!data[0]) {
                return {
                    success: false,
                    message: "Usuário ou senha inválidos."
                };
            }

            return {
                success: true,
                message: "Usuário logado com sucesso.",
                is_instrutor: data[0].is_instrutor,
                id_usuario: data[0].id_usuario
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao efetuar login."
            };
        }
    }

    async atualizarConta(id: number, params: AtualizarContaRequestDto): Promise<ContaOutputDto> {
        try {
            await this.repo.update({ id_usuario: id }, params as any);

            return {
                success: true,
                message: "Conta atualizada com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao atualizar a conta."
            };
        }
    }

    async deletarConta(id: number): Promise<ContaOutputDto> {
        try {
            await this.repo.delete({ id_usuario: id });

            return {
                success: true,
                message: "Conta removida com sucesso."
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message || "Erro interno ao remover a conta."
            };
        }
    }
}