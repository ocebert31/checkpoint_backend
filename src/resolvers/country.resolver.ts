import { CountryEntity } from "../entities/Country"; 
import { AppDataSource } from "../lib/datasource"
import emojiRegex from "emoji-regex";

const countryRepo = AppDataSource.getRepository(CountryEntity);

export const resolvers = {
  Query: {
    countries: () => countryRepo.find(),
  },
  Mutation: {
    addCountry: async (_: any, args: { code: string; name: string; emoji: string }) => {
        if (args.code.length !== 2) {
            throw new Error("Le code doit contenir exactement 2 caractères");
        }
        const regex = emojiRegex();
        if (!regex.test(args.emoji)) {
            throw new Error("Le champ emoji doit contenir un emoji valide");
        }
        const country = countryRepo.create({
            code: args.code,
            name: args.name,
            emoji: args.emoji,
        });
        return await countryRepo.save(country);
    },
  },
};
