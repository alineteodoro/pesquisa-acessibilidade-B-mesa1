import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class CriarContaRequestDto {
    @ApiProperty({ description: "Nome do usuário", example: "Lucas", type: "string" })
    @IsString({ message: "O nome deve ser uma string." })
    @IsNotEmpty({ message: "O nome não pode estar vazio." })
    public nome: string;

    @ApiProperty({ description: "E-mail do usuário", example: "lucas@gmail.com", type: "string" })
    @IsString({ message: "O e-mail deve ser uma string." })
    @IsNotEmpty({ message: "O e-mail não pode estar vazio." })
    @IsEmail({}, { message: "Informe um e-mail válido." })
    public email: string;

    @ApiProperty({ description: "Senha do usuário", example: "12345678", type: "string" })
    @IsString({ message: "A senha deve ser uma string." })
    @IsNotEmpty({ message: "A senha não pode estar vazia." })
    @Length(8, 12, { message: "A senha deve ter entre 8-12 caracteres." })
    public senha_hash: string;

    @ApiProperty({ description: "Data de nascimento no formato ISO ou dd-mm-yyyy", example: "2009-07-29", type: "string" })
    @IsString({ message: "A data de nascimento deve ser uma string." })
    @IsNotEmpty({ message: "A data de nascimento não pode estar vazia." })
    @Matches(/^(\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4})$/, { message: "A data de nascimento deve estar no formato yyyy-mm-dd ou dd-mm-yyyy." })
    public dt_nascimento: string;

    @ApiPropertyOptional({ description: "Indica se a conta está ativa", example: true, type: "boolean" })
    @IsOptional()
    @IsBoolean({ message: "O campo ativo deve ser um booleano." })
    public ativo: boolean = true;

    @ApiPropertyOptional({ description: "Indica se o usuário é instrutor", example: false, type: "boolean" })
    @IsOptional()
    @IsBoolean({ message: "O campo is_instrutor deve ser um booleano." })
    public is_instrutor: boolean = false;
}