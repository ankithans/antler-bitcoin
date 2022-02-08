import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { AuthState } from "../../context/authContext";
import { auth } from "../../firebase";

export default function LoginForm({ setIsLoginForm, handleClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { setAlert } = AuthState();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (email === "" || password === "") {
			return;
		}

		try {
			const result = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			console.log(result);

			setAlert({
				open: true,
				message: `Sign In Successfull. Welcome ${result.user.email}`,
				type: "success",
			});

			handleClose();
		} catch (error) {
			setAlert({
				open: true,
				message: error.message,
				type: "error",
			});
			return;
		}
	};

	return (
		<div>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-600"
					>
						Your email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
						placeholder="name@company.com"
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-medium text-gray-600"
					>
						Your password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="••••••••"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
						required
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>

				<button
					type="submit"
					onClick={handleSubmit}
					className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
				>
					Login to your account
				</button>
			</form>
			<div className="pt-5 text-sm font-medium text-gray-500">
				Not registered?{"   "}
				<button
					onClick={() => setIsLoginForm(false)}
					className="text-blue-700 hover:underline dark:text-blue-500"
				>
					Create account
				</button>
			</div>
		</div>
	);
}