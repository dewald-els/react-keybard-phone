import PhoneInput from "../phone-input/phone-input.tsx";

const PhoneNumberPage = () => {
	return (
		<div>
			<h1>Phone Number Page</h1>
			<PhoneInput defaultCountryCode={"NO"} />
		</div>
	);
};

export default PhoneNumberPage;
