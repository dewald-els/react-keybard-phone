import { CountryWithCode } from "./types.ts";
import { countries, Country } from "countries-list";

export const countriesWithCode: CountryWithCode[] = Object.keys(countries).map((countryCode: string) => {
	return {
		...(countries as Record<string, Country>)[countryCode],
		code: countryCode,
	};
});
