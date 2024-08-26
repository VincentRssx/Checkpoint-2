import { AppDataSource } from "../AppDataSource";
import { Country } from "../entities/Country";

AppDataSource.initialize()
	.then(async () => {
		console.log("Database connected");

		const countryRepository = AppDataSource.getRepository(Country);

		// Données des pays avec code de continent
		const countries = [
			{ code: "FR", name: "France", emoji: "🇫🇷", continentCode: "EU" },
			{ code: "BE", name: "Belgique", emoji: "🇧🇪", continentCode: "EU" },
			{ code: "AN", name: "Andorre", emoji: "🇦🇩", continentCode: "EU" },
			{ code: "ES", name: "Espagne", emoji: "🇪🇸", continentCode: "EU" },
			{ code: "IT", name: "Italie", emoji: "🇮🇹", continentCode: "EU" },
			{ code: "DE", name: "Allemagne", emoji: "🇩🇪", continentCode: "EU" },
			{ code: "JP", name: "Japon", emoji: "🇯🇵", continentCode: "AS" },
			{
				code: "US",
				name: "États-Unis",
				emoji: "🇺🇸",
				continentCode: "NA",
			},
			{ code: "CN", name: "Chine", emoji: "🇨🇳", continentCode: "AS" },
			{
				code: "KR",
				name: "Corée du Sud",
				emoji: "🇰🇷",
				continentCode: "AS",
			},
		];

		for (const data of countries) {
			// Vérifier si le pays existe déjà
			const existingCountry = await countryRepository.findOneBy({
				code: data.code,
			});
			if (!existingCountry) {
				// Si le pays n'existe pas, le créer et l'ajouter
				const country = countryRepository.create(data);
				await countryRepository.save(country);
				console.log(`Country ${data.code} has been added`);
			} else {
				console.log(`Country ${data.code} already exists`);
			}
		}

		console.log("Countries initialization completed");
	})
	.catch((error) =>
		console.log("Error during Data Source initialization:", error)
	);
