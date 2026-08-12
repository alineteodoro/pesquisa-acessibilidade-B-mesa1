import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("curso")
export class CursoEntity{

    @PrimaryGeneratedColumn({name:"id_curso", type:"integer"})
    public id_curso:number;

    @Column({name:"nome", type:"varchar", length:200})
    public nome:string;

    @Column({name:"descricao", type:"text"})
    public descricao:string;

    @Column({name:"duracao", type:"integer"})
    public duracao:number;

    @Column({name:"ativo", type:"boolean"})
    public ativo:boolean;

    @Column({name:"categoria", type:"varchar", length:120})
    public categoria:string;

}