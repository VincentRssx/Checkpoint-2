import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/CountryResolver";
import { AppDataSource } from "./AppDataSource";

async function startServer() {
	await AppDataSource.initialize();

	const schema = await buildSchema({
		resolvers: [CountryResolver],
	});

	const server = new ApolloServer({
		schema,
	});

	const { url } = await startStandaloneServer(server);
	console.log(`🚀 Server ready at ${url}`);
}

startServer().catch((err) => console.log(err));
