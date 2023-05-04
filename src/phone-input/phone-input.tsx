import "./phone-input.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { KeyboardReact, SimpleKeyboard } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { countries, Country, getEmojiFlag } from "countries-list";

const keyboardDisplay = {
	"{alt}": ".?123",
	"{enter}":
		"<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
		"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M21.3333 0.666626H16V3.33329H21.3333V14H5.10667L9.88 9.21329L8 7.33329L0 15.3333L8 23.3333L9.88 21.4533L5.10667 16.6666H21.3333H24V14V3.33329V0.666626H21.3333Z\" fill=\"white\"/>\n" +
		"</svg>",
	"{bksp}":
		"<svg width=\"32\" height=\"24\" viewBox=\"0 0 32 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
		"<path d=\"M29.3333 0H9.33333C8.41333 0 7.69333 0.466667 7.21333 1.17333L0 12L7.21333 22.8133C7.69333 23.52 8.41333 24 9.33333 24H29.3333C30.8 24 32 22.8 32 21.3333V2.66667C32 1.2 30.8 0 29.3333 0ZM29.3333 21.3333H9.42667L3.2 12L9.41333 2.66667H29.3333V21.3333ZM13.88 18.6667L18.6667 13.88L23.4533 18.6667L25.3333 16.7867L20.5467 12L25.3333 7.21333L23.4533 5.33333L18.6667 10.12L13.88 5.33333L12 7.21333L16.7867 12L12 16.7867L13.88 18.6667Z\" fill=\"#212121\"/>\n" +
		"</svg>",
	"{downkeyboard}":
		"<svg width=\"28\" height=\"27\" viewBox=\"0 0 28 27\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
		"<path d=\"M24.667 0H3.33366C1.86699 0 0.680326 1.2 0.680326 2.66667L0.666992 16C0.666992 17.4667 1.86699 18.6667 3.33366 18.6667H24.667C26.1337 18.6667 27.3337 17.4667 27.3337 16V2.66667C27.3337 1.2 26.1337 0 24.667 0ZM24.667 16H3.33366V2.66667H24.667V16ZM12.667 4H15.3337V6.66667H12.667V4ZM12.667 8H15.3337V10.6667H12.667V8ZM8.66699 4H11.3337V6.66667H8.66699V4ZM8.66699 8H11.3337V10.6667H8.66699V8ZM4.66699 8H7.33366V10.6667H4.66699V8ZM4.66699 4H7.33366V6.66667H4.66699V4ZM8.66699 12H19.3337V14.6667H8.66699V12ZM16.667 8H19.3337V10.6667H16.667V8ZM16.667 4H19.3337V6.66667H16.667V4ZM20.667 8H23.3337V10.6667H20.667V8ZM20.667 4H23.3337V6.66667H20.667V4ZM14.0003 26.6667L19.3337 21.3333H8.66699L14.0003 26.6667Z\" fill=\"#212121\"/>\n" +
		"</svg>",
	"{space}": " ",
	"{default}": "ABC",
	"{back}":
		"<svg width=\"11\" height=\"16\" viewBox=\"0 0 11 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
		"<path d=\"M10.547 1.88L8.66699 0L0.666992 8L8.66699 16L10.547 14.12L4.44033 8L10.547 1.88Z\" fill=\"#212121\"/>\n" +
		"</svg>",
	"{fwd}":
		"<svg width=\"11\" height=\"16\" viewBox=\"0 0 11 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
		"<path d=\"M2.33312 0L0.453125 1.88L6.55979 8L0.453125 14.12L2.33312 16L10.3331 8L2.33312 0Z\" fill=\"#212121\"/>\n" +
		"</svg>",
};

type PhoneInputProps = {
	defaultValue?: string;
	defaultCountryCode: string;
}

type PhoneInputState = {
	phoneNumber: string;
	countrySearch: string;
}

enum PhoneInputs {
	phoneNumber = "phoneNumber",
	countrySearch = "countrySearch"
}

type CountryWithCode = Country & { code: string };
const countriesWithCode: CountryWithCode[] = Object.keys(countries).map((countryCode: string) => {
	return {
		...(countries as Record<string, Country>)[countryCode],
		code: countryCode,
	};
});

const PhoneInput = (props: PhoneInputProps) => {

	const { defaultValue, defaultCountryCode } = props;
	const keyboardRef = useRef<SimpleKeyboard | null>(null);
	const [phoneCountry, setPhoneCountry] = useState<CountryWithCode>(
		countriesWithCode.find((country: CountryWithCode) => country.code === defaultCountryCode) as CountryWithCode);

	const phoneInputRef = useRef<HTMLInputElement | null>(null);
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const [inputs, setInputs] = useState<PhoneInputState>({
		phoneNumber: defaultValue || "",
		countrySearch: "",
	});

	const [focusedInput, setFocusedInput] = useState(PhoneInputs.phoneNumber);
	const [layout, setLayout] = useState<string>("phone");
	const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

	useEffect(() => {
		if (keyboardRef.current) {
			keyboardRef.current.setInput(inputs[focusedInput], focusedInput);
			keyboardRef.current?.setCaretPosition(inputs[focusedInput].length, inputs[focusedInput].length);
			phoneInputRef.current!.focus();
		}
	}, []);

	useEffect(() => {
		if (keyboardRef.current && phoneInputRef.current) {
			setTimeout(() => {
				phoneInputRef.current!.setSelectionRange(keyboardRef.current!.getCaretPosition(), keyboardRef.current!.getCaretPosition());
				phoneInputRef.current!.focus();
			}, 10);
		}
	}, [inputs.phoneNumber]);

	useEffect(() => {
		if (keyboardRef.current && searchInputRef.current) {
			setTimeout(() => {
				searchInputRef.current!.setSelectionRange(keyboardRef.current!.getCaretPosition(), keyboardRef.current!.getCaretPosition());
				searchInputRef.current!.focus();
			}, 10);
		}
	}, [inputs.countrySearch]);

	const onInputChange = (newInputValue: string): void => {
		if (keyboardRef.current?.getCaretPosition() === null) { // in case input focus was accidentally lost
			keyboardRef.current?.setCaretPosition(newInputValue.length, newInputValue.length);
		}
		setInputs({
			...inputs,
			[focusedInput]: newInputValue,
		});
	};

	const handleCountryClick = (country: CountryWithCode) => {
		setPhoneCountry(country);
		setSearchIsOpen(false);
		setFocusedInput(PhoneInputs.phoneNumber);
		setLayout("phone");
		setInputs({ ...inputs, countrySearch: "" });

		keyboardRef.current?.setCaretPosition(inputs.phoneNumber.length, inputs.phoneNumber.length);
		phoneInputRef.current!.focus();

	};

	const countryList = useMemo(() => {
		return countriesWithCode
			.filter((country) => {
				return country.name.toLowerCase().includes(inputs.countrySearch.toLowerCase());
			})
			.map((country: CountryWithCode) => {
				return (
					<li className={"phone-input__country-search__list__item"} key={country.name}
							onClick={() => handleCountryClick(country)}>
						<span>{getEmojiFlag(country.code)}</span>
						<span>{country.name}</span> - <span>+{country.phone}</span>
					</li>
				);
			});
	}, [inputs.phoneNumber, inputs.countrySearch]);

	return (
		<>
			<div className="phone-input">
				<div className="phone-input__phone-input">
					<div className="phone-input__country">
						<div className="phone-input__country__flag">
							<button onClick={() => {
								setSearchIsOpen(true);
								setFocusedInput(PhoneInputs.countrySearch);
								setLayout("default");
								keyboardRef.current?.setInput("", PhoneInputs.countrySearch);
								keyboardRef.current?.setCaretPosition(0, 0);
								setInputs({
									...inputs,
									countrySearch: "",
								});

								setTimeout(() => {
									searchInputRef.current!.focus();
								}, 0);
							}}>
								<span>{getEmojiFlag(phoneCountry.code)}</span>
								<span>+{phoneCountry.phone}</span>
							</button>
						</div>
					</div>
					<div className="phone-input__input">
						<input type="tel"
									 id={"phone"}
									 ref={phoneInputRef}
									 className={focusedInput === PhoneInputs.phoneNumber ? "focused" : ""}
									 placeholder="Phone number"
									 onClick={() => {
										 setInputs({
											 ...inputs,
											 countrySearch: "",
										 });
										 setFocusedInput(PhoneInputs.phoneNumber);
										 setSearchIsOpen(false);
										 setLayout("phone");
									 }}
									 value={inputs[PhoneInputs.phoneNumber]} onChange={() => {
						}} />
					</div>
				</div>
				<div className="phone-input__country-search" style={{
					display: searchIsOpen ? "block" : "none",
				}}>
					<div className="phone-input__country-search__input">
						<input type="text"
									 id={"search"}
									 ref={searchInputRef}
									 className={"phone-input__country-search-input__element" + (focusedInput === PhoneInputs.countrySearch ? "focused" : "")}
									 placeholder="Search"
									 value={inputs[PhoneInputs.countrySearch]}
									 onChange={() => {
									 }}
									 onClick={() => {
										 setFocusedInput(PhoneInputs.countrySearch);
									 }} />
						<button onClick={() => {
							setSearchIsOpen(false);
							setFocusedInput(PhoneInputs.phoneNumber);
							setLayout("phone");
							setInputs({
								...inputs,
								countrySearch: "",
							});
							keyboardRef.current?.setInput(inputs.phoneNumber, PhoneInputs.phoneNumber);
						}}>Cancel
						</button>
					</div>
					<div className="phone-input__country-search__list">
						<ul>{countryList}</ul>
					</div>
				</div>
			</div>
			<div className="keyboard-container">
				<KeyboardReact
					keyboardRef={(r: SimpleKeyboard) => (keyboardRef.current = r)}
					onChange={onInputChange}
					inputName={focusedInput}
					layoutName={layout}
					display={keyboardDisplay}
					layout={{
						default: [
							"q w e r t y u i o p {bksp}",
							"a s d f g h j k l {enter}",
							"z x c v b n m - .",
							"{alt} {space} ",
						],
						phone: [
							"1 2 3",
							"4 5 6",
							"7 8 9",
							"{bksp} 0 {enter}",
						],
					}}
				/>
			</div>
		</>
	);
};

export default PhoneInput;
