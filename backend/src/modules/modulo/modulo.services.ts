import { Injectable } from "@nestjs/common";
import { ModuloRepository } from "./modulo.repository";
import { CriarModuloRequestDto } from "./dto/requests/criar-modulo-request.dto";
import { AtualizarModuloRequestDto } from "./dto/requests/atualizar-modulo-request.dto";
import { ModuloOutputDto } from "./dto/io/modulo-output.dto";
import { ModuloDetailOutputDto } from "./dto/io/modulo-detail-output.dto";

@Injectable()
export class ModuloServices {

    constructor(
        private repo: ModuloRepository
    ){}

    async criarModulo(params: CriarModuloRequestDto): Promise<ModuloOutputDto> {
        return await this.repo.criarModulo(params);
    }

    async buscarTodos(): Promise<ModuloDetailOutputDto[]> {
        return await this.repo.buscarTodos();
    }

    async buscarPorId(id_modulo: number): Promise<ModuloDetailOutputDto | null> {
        return await this.repo.buscarPorId(id_modulo);
    }

    async atualizarModulo(id_modulo: number, params: AtualizarModuloRequestDto): Promise<ModuloOutputDto> {
        return await this.repo.atualizarModulo(id_modulo, params);
    }

    async deletarModulo(id_modulo: number): Promise<ModuloOutputDto> {
        return await this.repo.deletarModulo(id_modulo);
    }
}
