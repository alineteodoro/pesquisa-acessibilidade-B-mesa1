import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class AtualizarConteudoRequestDto {
    @ApiPropertyOptional({ description: "Identificador da aula", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "O id_aula deve ser um número inteiro." })
    @IsPositive({ message: "O id_aula deve ser maior que zero." })
    public id_aula?: number;

    @ApiPropertyOptional({ description: "Tipo do conteúdo", example: "video", type: "string" })
    @IsOptional()
    @IsString({ message: "O tipo deve ser uma string." })
    @MaxLength(20, { message: "O tipo deve ter no máximo 20 caracteres." })
    public tipo?: string;

    @ApiPropertyOptional({ description: "URL do conteúdo", example: "https://example.com/video", type: "string" })
    @IsOptional()
    @IsString({ message: "A URL deve ser uma string." })
    public url?: string;

    @ApiPropertyOptional({ description: "Texto associado ao conteúdo", example: "Texto de apoio da aula", type: "string" })
    @IsOptional()
    @IsString({ message: "O texto deve ser uma string." })
    public texto?: string;

    @ApiPropertyOptional({ description: "Ordem do conteúdo dentro da aula", example: 1, type: "integer" })
    @IsOptional()
    @IsInt({ message: "A ordem deve ser um número inteiro." })
    @IsPositive({ message: "A ordem deve ser maior que zero." })
    public ordem?: number;

    @ApiPropertyOptional({ description: "Legenda do conteúdo", example: "Legenda do vídeo", type: "string" })
    @IsOptional()
    @IsString({ message: "A legenda deve ser uma string." })
    public legenda?: string;
}
