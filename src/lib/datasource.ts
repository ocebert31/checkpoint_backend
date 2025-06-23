import "reflect-metadata";
import { DataSource } from "typeorm";
import { CountryEntity } from "../entities/Country";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true, 
  logging: false,
  entities: [CountryEntity],
});
