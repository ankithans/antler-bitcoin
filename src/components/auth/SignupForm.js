import React from "react";
import { useState } from "react";
import { CryptoState } from "../../context/authContext";

export default function SignUpForm({ handleClose, setIsLoginForm }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { setAlert } = CryptoState();

	const handleSubmit = () => {
		if (password != confirmPassword) {
			setAlert({
				open: true,
				message: "email or password is incorrect",
				type: "error",
			});
			return;
		}

		try {
		} catch (error) {}

		// handleClose();
	};

	return (
		<div>
			<form className="space-y-4" action="#">
				<div>
					<label
						for="email"
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
						for="password"
						className="block mb-2 text-sm font-medium text-gray-600"
					>
						Set password
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

				<div>
					<label
						for="password"
						className="block mb-2 text-sm font-medium text-gray-600"
					>
						Confirm password
					</label>
					<input
						type="password"
						name="cofirm password"
						id="confirm password"
						placeholder="••••••••"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
						required
						value={confirmPassword}
						onChange={(event) =>
							setConfirmPassword(event.target.value)
						}
					/>
				</div>

				<button
					type="submit"
					onClick={handleSubmit}
					className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
				>
					Create account
				</button>
			</form>
			<div className="pt-5 text-sm font-medium text-gray-500">
				Already registered?{"   "}
				<button
					onClick={() => setIsLoginForm(true)}
					className="text-blue-700 hover:underline dark:text-blue-500"
				>
					Sign In
				</button>
			</div>
		</div>
	);
}
