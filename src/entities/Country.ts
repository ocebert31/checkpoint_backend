import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";

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

    @Column({ length: 2, nullable: false })
    continentCode: string;

    @BeforeInsert()
    @BeforeUpdate()
    uppercaseCode() {
        if (this.code) {
            this.code = this.code.toUpperCase();
        }
        if (this.continentCode) {
            this.continentCode = this.continentCode.toUpperCase();
        }
    }
}
