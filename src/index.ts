import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { AppDataSource } from "./lib/datasource";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Le serveur Apollo démarre sur ${url}`);
}

async function testDB() {
  await AppDataSource.initialize();
  console.log("DB connectée avec succès !");
}

testDB();

main();
