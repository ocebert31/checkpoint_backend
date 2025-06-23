import { AppDataSource } from "./lib/datasource";
import { CountryEntity } from "./entities/Country";

export async function loadFixtures() {
    const repo = AppDataSource.getRepository(CountryEntity);

    const countries = [
        { code: "FR", name: "France", emoji: "😀", continentCode: "EU" },
        { code: "DE", name: "Germany", emoji: "🦾", continentCode: "EU" },

        { code: "US", name: "United States", emoji: "🚀", continentCode: "NA" },
        { code: "CA", name: "Canada", emoji: "🎨", continentCode: "NA" },

        { code: "JP", name: "Japan", emoji: "♻️", continentCode: "AS" },
        { code: "IN", name: "India", emoji: "🛠️", continentCode: "AS" },
    ];

    for (const country of countries) {
        const exists = await repo.findOneBy({ code: country.code });
        if (!exists) {
            const newCountry = repo.create(country);
            await repo.save(newCountry);
            console.log(`Inserted country: ${country.name}`);
        }
    }
}
