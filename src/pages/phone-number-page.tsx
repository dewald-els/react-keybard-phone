import PhoneInput from "../phone-input/phone-input.tsx";
import { useEffect, useState } from "react";
import { CountryCode, isValidNumber } from "libphonenumber-js";
import { CountryWithCode } from "../types.ts";
import { countriesWithCode } from "../utils.ts";

const defaultCountry = countriesWithCode.find((country: CountryWithCode) => country.code === "NO") as CountryWithCode;

const PhoneNumberPage = () => {

	const [phoneNumber, setPhoneNumber] = useState<string>("413 85 187");
	const [country, setCountry] = useState<CountryWithCode>(defaultCountry!);

	useEffect(() => {
		console.log("Phone number changed: ", phoneNumber);
	}, [phoneNumber]);

	useEffect(() => {
		console.log("Country changed: ", country);
	}, [country]);

	const isValidPhoneNumber = isValidNumber(phoneNumber, country.code as CountryCode);

	return (
		<div className="page">
			<h1>Phone Number Page</h1>
			<PhoneInput
				defaultValue={phoneNumber}
				defaultCountryCode={country.code}
				onPhoneNumberChanged={setPhoneNumber}
				onCountryChanged={setCountry} />

			<button className="continue" disabled={!isValidPhoneNumber}>Continue</button>
		</div>
	);
};

export default PhoneNumberPage;
