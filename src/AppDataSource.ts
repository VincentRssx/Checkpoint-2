import { DataSource } from "typeorm";
import { Country } from "./entities/Country";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: "./country.sqlite",
	synchronize: true,
	entities: [Country],
});
