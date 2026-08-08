import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("conteudo")
export class ConteudoEntity {

    @PrimaryGeneratedColumn({name:"id_conteudo", type:"integer"})
    public id_conteudo: number;

    @Column({name:"id_aula", type:"integer"})
    public id_aula: number;

    @Column({name:"tipo", type:"varchar", length:20})
    public tipo: string;

    @Column({name:"url", type:"text"})
    public url: string;

    @Column({name:"texto", type:"text"})
    public texto: string;

    @Column({name:"ordem", type:"integer"})
    public ordem: number;

    @Column({name:"legenda", type:"text"})
    public legenda: string;

}