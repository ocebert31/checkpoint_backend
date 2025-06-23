import { CountryEntity } from "../entities/Country";
import { AppDataSource } from "../lib/datasource";
import { Repository } from "typeorm";

export default class CountryRepository extends Repository<CountryEntity> {
    constructor() {
        super(CountryEntity, AppDataSource.createEntityManager())
    }
}