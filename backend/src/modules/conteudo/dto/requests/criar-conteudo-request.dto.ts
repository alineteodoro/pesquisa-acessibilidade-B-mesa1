import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator";

export class CriarConteudoRequestDto {
    @ApiProperty({ description: "Identificador da aula", example: 1, type: "integer" })
    @IsInt({ message: "O id_aula deve ser um número inteiro." })
    @IsPositive({ message: "O id_aula deve ser maior que zero." })
    public id_aula: number;

    @ApiProperty({ description: "Tipo do conteúdo", example: "video", type: "string" })
    @IsString({ message: "O tipo deve ser uma string." })
    @IsNotEmpty({ message: "O tipo não pode estar vazio." })
    @MaxLength(20, { message: "O tipo deve ter no máximo 20 caracteres." })
    public tipo: string;

    @ApiProperty({ description: "URL do conteúdo", example: "https://example.com/video", type: "string" })
    @IsString({ message: "A URL deve ser uma string." })
    @IsNotEmpty({ message: "A URL não pode estar vazia." })
    public url: string;

    @ApiProperty({ description: "Texto associado ao conteúdo", example: "Texto de apoio da aula", type: "string" })
    @IsString({ message: "O texto deve ser uma string." })
    @IsNotEmpty({ message: "O texto não pode estar vazio." })
    public texto: string;

    @ApiProperty({ description: "Ordem do conteúdo dentro da aula", example: 1, type: "integer" })
    @IsInt({ message: "A ordem deve ser um número inteiro." })
    @IsPositive({ message: "A ordem deve ser maior que zero." })
    public ordem: number;

    @ApiProperty({ description: "Legenda do conteúdo", example: "Legenda do vídeo", type: "string" })
    @IsString({ message: "A legenda deve ser uma string." })
    @IsNotEmpty({ message: "A legenda não pode estar vazia." })
    public legenda: string;

    @ApiProperty({ description: "Duração do vídeo em segundos", example: 120, type: "integer" })
    @IsInt({ message: "A duração do vídeo deve ser um número inteiro." })
    @IsPositive({ message: "A duração do vídeo deve ser maior que zero." })
    public duracao_video: number;

}
