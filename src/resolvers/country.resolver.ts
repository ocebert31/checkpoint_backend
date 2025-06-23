import { CountryEntity } from "../entities/Country"; 
import { AppDataSource } from "../lib/datasource"
import emojiRegex from "emoji-regex";

const countryRepo = AppDataSource.getRepository(CountryEntity);

export const resolvers = {
    Query: {
        countries: () => countryRepo.find(),

        countryByCode: async (_: any, args: { code: string }) => {
            const code = args.code.toUpperCase();
            const country = await countryRepo.findOneBy({ code });
            if (!country) {
                throw new Error(`Aucun pays trouvé avec le code : ${code}`);
            }
            return country;
        },

        countriesByContinent: async (_: any, args: { continentCode: string }) => {
            const continentCode = args.continentCode.toUpperCase();
            return await countryRepo.findBy({ continentCode });
        },
    },
  
    Mutation: {
        addCountry: async (_: any, args: { code: string; name: string; emoji: string; continentCode: string }) => {
        if (args.code.length !== 2) {
            throw new Error("Le code doit contenir exactement 2 caractères");
        }
        if (args.continentCode.length !== 2) {
            throw new Error("Le code du continent doit contenir exactement 2 caractères");
        }
        const regex = emojiRegex();
        if (!regex.test(args.emoji)) {
            throw new Error("Le champ emoji doit contenir un emoji valide");
        }
        const country = countryRepo.create({
            code: args.code,
            name: args.name,
            emoji: args.emoji,
            continentCode: args.continentCode,
        });
        return await countryRepo.save(country);
        },
    },
};
