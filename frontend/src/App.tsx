import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Toaster } from "sonner";

function App() {
	return (
		<BrowserRouter>
			<Toaster position="top-center" richColors />
			<Routes>
				<Route
					path="/"
					element={<Dashboard />}
				/>
				<Route
					path="/signup"
					element={<Signup />}
				/>
				<Route
					path="/signin"
					element={<Signin />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
