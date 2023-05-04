import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div>
			<h1>Home Page</h1>
			<Link to={"/phone-number"}>Phone Number Page</Link>
		</div>
	);
};

export default HomePage;
