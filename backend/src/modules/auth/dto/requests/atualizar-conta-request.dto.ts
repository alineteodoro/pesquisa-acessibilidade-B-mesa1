import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsOptional, IsString, Length, Matches } from "class-validator";

export class AtualizarContaRequestDto {
    @ApiPropertyOptional({ description: "Nome do usuário", example: "Lucas", type: "string" })
    @IsOptional()
    @IsString({ message: "O nome deve ser uma string." })
    public nome?: string;

    @ApiPropertyOptional({ description: "E-mail do usuário", example: "lucas@gmail.com", type: "string" })
    @IsOptional()
    @IsEmail({}, { message: "Informe um e-mail válido." })
    public email?: string;

    @ApiPropertyOptional({ description: "Senha do usuário", example: "12345678", type: "string" })
    @IsOptional()
    @IsString({ message: "A senha deve ser uma string." })
    @Length(8, 12, { message: "A senha deve ter entre 8-12 caracteres." })
    public senha_hash?: string;

    @ApiPropertyOptional({ description: "Data de nascimento no formato dd-mm-yyyy", example: "29-07-2009", type: "string" })
    @IsOptional()
    @IsString({ message: "A data de nascimento deve ser uma string." })
    @Matches(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/, { message: "A data de nascimento deve estar no formato dd-mm-yyyy." })
    public dt_nascimento?: string;

    @ApiPropertyOptional({ description: "Indica se a conta está ativa", example: true, type: "boolean" })
    @IsOptional()
    @IsBoolean({ message: "O campo ativo deve ser um booleano." })
    public ativo?: boolean;

    @ApiPropertyOptional({ description: "Indica se o usuário é instrutor", example: false, type: "boolean" })
    @IsOptional()
    @IsBoolean({ message: "O campo is_instrutor deve ser um booleano." })
    public is_instrutor?: boolean;
}
