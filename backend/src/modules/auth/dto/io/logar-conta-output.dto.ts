

export interface LogarContaOutputDto{

    success:boolean;
    message:string
    is_instrutor?:boolean;
    token?: string;
    usuario?: { id_usuario: number; nome: string; email: string; is_instrutor: boolean };

}
