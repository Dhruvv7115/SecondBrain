import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import BrainIcon from "../components/icons/BrainIcon";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ExclamationIcon from "../components/icons/ExclamationIcon";

export default function Signin() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async () => {
		setLoading(true);
		const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
		if (!username || !password) {
			setError("Username and Password are required.");
			setLoading(false);
			return;
		}

		try {
			const response = await axios.post(`${VITE_BACKEND_URL}/user/login`, {
				username,
				password,
			});
			if (!response.data.token) {
				setError(response.data.message);
				return;
			}
			const token = response.data.token;
			localStorage.setItem("token", token);
			setTimeout(() => {
				setLoading(false);
				setPassword("");
				setUsername("");
				navigate("/");
			}, 2000);
		} catch (error: any) {
			setError(error.response.data.message);
			console.error(error.response.data.message);
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-neutral-100">
			<div className="bg-white rounded-md p-8 min-w-md flex flex-col gap-8 items-center shadow-xl">
				<div className="font-extrabold text-2xl text-indigo-600 flex items-center gap-2">
					<span>
						<BrainIcon size={36} />
					</span>
					<h1>Second Brain</h1>
				</div>
				<h1 className="font-bold text-xl text-indigo-500">Sign In</h1>
				<Input
					placeholder="Enter your username"
					type="text"
					label="Username"
					value={username}
					onChange={(e) => {
						setError("");
						setUsername(e.target.value);
					}}
					fullWidth
				/>
				<Input
					placeholder="Enter your password"
					label="Password"
					type="password"
					value={password}
					onChange={(e) => {
						setError("");
						setPassword(e.target.value);
					}}
					fullWidth
				/>
				{error && (
					<div className="text-red-500 flex items-center gap-2">
						<ExclamationIcon />
						<p>{error}</p>
					</div>
				)}
				<Button
					onClick={handleSubmit}
					fullWidth
					loading={loading}
					loadingText="Signing in..."
				>
					Sign in
				</Button>
				<p>
					Don't have an account?{" "}
					<Link
						to="/signup"
						className="hover:underline text-blue-700 hover:text-blue-800 transition-all duration-200"
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}
