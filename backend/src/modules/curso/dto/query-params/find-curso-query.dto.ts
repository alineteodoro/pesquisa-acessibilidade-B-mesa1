import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";

export class FindCursoQueryDto {
    @ApiPropertyOptional({ description: "Filtrar por nome do curso", example: "Acessibilidade", type: "string" })
    @IsOptional()
    @IsString({ message: "O nome deve ser uma string." })
    @MaxLength(200, { message: "O nome deve ter no máximo 200 caracteres." })
    public nome?: string;

    @ApiPropertyOptional({ description: "Filtrar por categoria", example: "Tecnologia", type: "string" })
    @IsOptional()
    @IsString({ message: "A categoria deve ser uma string." })
    @MaxLength(120, { message: "A categoria deve ter no máximo 120 caracteres." })
    public categoria?: string;

    @ApiPropertyOptional({ description: "Filtrar por status ativo", example: true, type: "boolean" })
    @IsOptional()
    @IsBoolean({ message: "O ativo deve ser um booleano." })
    public ativo?: boolean;
}
