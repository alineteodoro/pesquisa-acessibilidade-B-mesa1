import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("avaliacao_curso")
export class AvaliacaoCursoEntity {

    @PrimaryGeneratedColumn({name:"id_avaliacao", type:"integer"})
    public id_avaliacao: number;

    @Column({name:"id_matricula", type:"integer"})
    public id_matricula: number;

    @Column({name:"nota", type:"integer"})
    public nota: number;

    @Column({name:"comentario", type:"text"})
    public comentario: string;

    @Column({name:"dt_avaliacao", type:"timestamp"})
    public dt_avaliacao: Date;

}