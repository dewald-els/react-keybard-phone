import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page.tsx";
import PhoneNumberPage from "./pages/phone-number-page.tsx";

function App() {

	return (
		<BrowserRouter>
			<div className="container">
				<h1>The Ultimate Keyboard Solution</h1>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/phone-number" element={<PhoneNumberPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
