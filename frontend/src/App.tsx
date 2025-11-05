import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Toaster } from "sonner";
import Protected from "./components/Protected";
import SharedBrain from "./pages/ShareBrain";
import LinkedInPost from "./pages/LinkedInPost";

function App() {
	return (
		<BrowserRouter>
			<Toaster
				position="top-center"
				richColors
			/>
			<Routes>
				<Route
					path="/"
					element={
						<Protected>
							<Dashboard />
						</Protected>
					}
				/>
				<Route
					path="/share/:hash"
					element={<SharedBrain />}
				/>
				<Route
					path="/signup"
					element={<Signup />}
				/>
				<Route
					path="/signin"
					element={<Signin />}
				/>
				<Route
					path="/linkedin"
					element={<LinkedInPost />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
