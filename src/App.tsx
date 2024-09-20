import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/home";

function App() {
	const location = useLocation();
	const navigate = useNavigate();
   const queryParams = new URLSearchParams(location.search);
   const code = queryParams.get("code");
	useEffect(() => {


		if (!code) {
			queryParams.set("code", "8753");
			navigate(`?${queryParams.toString()}`, { replace: true });
		}
	}, [location, navigate]);

	return (
		<Routes>
			<Route path="/" element={<HomePage code={Number(code)} />} />
		</Routes>
	);
}

export default App;
