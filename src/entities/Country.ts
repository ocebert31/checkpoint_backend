import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "country"})
export class CountryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 2, nullable: false }) 
    code: string;

    @Column({ length: 3, nullable: false })
    name: string;

    @Column({ nullable: false })
    emoji: string;
}
