import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";

@Resolver()
export class CountryResolver {
	@Query(() => [Country])
	async countries() {
		return Country.find();
	}

	@Query(() => Country, { nullable: true })
	async countryByCode(@Arg("code") code: string): Promise<Country | null> {
		return Country.findOneBy({ code });
	}

	@Query(() => [Country])
	async countriesByContinent(
		@Arg("continentCode") continentCode: string
	): Promise<Country[]> {
		return Country.findBy({ continentCode });
	}

	@Mutation(() => Country)
	async addCountry(
		@Arg("code") code: string,
		@Arg("name") name: string,
		@Arg("emoji") emoji: string,
		@Arg("continentCode") continentCode: string
	): Promise<Country> {
		const country = Country.create({ code, name, emoji, continentCode });
		await country.save();
		return country;
	}
}
