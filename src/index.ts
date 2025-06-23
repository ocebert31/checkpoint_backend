import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AppDataSource } from "./lib/datasource";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { loadFixtures } from "./fixtures";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("DB connectée avec succès !");
        await loadFixtures();
        console.log("Fixtures chargées");
        const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        });
        console.log(`🚀 Le serveur Apollo démarre sur ${url}`);
    } catch (error) {
        console.error("Erreur au démarrage :", error);
    }
}

main();
