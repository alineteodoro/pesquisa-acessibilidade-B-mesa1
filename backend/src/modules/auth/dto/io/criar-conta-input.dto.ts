

export interface CriarContaInputDto{

    nome:string;
    email:string
    senha_hash:string;
    dt_nascimento:Date | string;
    ativo:boolean;
    is_instrutor:boolean;

}