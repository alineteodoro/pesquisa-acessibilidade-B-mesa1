export interface ContaDetailOutputDto {
    id_usuario: number;
    nome: string;
    email: string;
    dt_nascimento: Date | string;
    ativo: boolean;
    is_instrutor: boolean;
}
