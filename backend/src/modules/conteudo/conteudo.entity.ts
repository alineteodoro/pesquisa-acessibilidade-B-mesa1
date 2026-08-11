import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("conteudo")
export class ConteudoEntity {

    @PrimaryGeneratedColumn({name:"id_conteudo", type:"integer"})
    public id_conteudo: number;

    @Column({name:"id_aula", type:"integer", nullable:true})
    public id_aula: number;

    @Column({name:"tipo", type:"varchar", length:20, nullable:true})
    public tipo: string;

    @Column({name:"url", type:"text", nullable:true})
    public url: string;

    @Column({name:"texto", type:"text", nullable:true})
    public texto: string;

    @Column({name:"ordem", type:"integer", nullable:true})
    public ordem: number;

    @Column({name:"legenda", type:"text", nullable:true})
    public legenda: string;

    @Column({name:"duracao_video", type:"integer", nullable:true})
    public duracao_video: number;

}