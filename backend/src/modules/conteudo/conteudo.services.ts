import { Injectable } from "@nestjs/common";
import { ConteudoRepository } from "./conteudo.repository";
import { CriarConteudoRequestDto } from "./dto/requests/criar-conteudo-request.dto";
import { AtualizarConteudoRequestDto } from "./dto/requests/atualizar-conteudo-request.dto";
import { ConteudoOutputDto } from "./dto/io/conteudo-output.dto";
import { ConteudoDetailOutputDto } from "./dto/io/conteudo-detail-output.dto";

@Injectable()
export class ConteudoServices {

    constructor(
        private repo: ConteudoRepository
    ){}

    async criarConteudo(params: CriarConteudoRequestDto): Promise<ConteudoOutputDto> {
        return await this.repo.criarConteudo(params);
    }

    async buscarTodos(): Promise<ConteudoDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    async buscarPorId(id_conteudo: number): Promise<ConteudoDetailOutputDto | null> {
        return await this.repo.buscarPorId(id_conteudo);
    }

    async atualizarConteudo(id_conteudo: number, params: AtualizarConteudoRequestDto): Promise<ConteudoOutputDto> {
        return await this.repo.atualizarConteudo(id_conteudo, params);
    }

    async deletarConteudo(id_conteudo: number): Promise<ConteudoOutputDto> {
        return await this.repo.deletarConteudo(id_conteudo);
    }
}
