import React from "react";
import { useState } from "react";
import { CryptoState } from "../../context/authContext";

export default function LoginForm({ handleClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { setAlert } = CryptoState();

	const handleSubmit = () => {
		setAlert({
			open: true,
			message: "email or password is incorrect",
			type: "error",
		});

		return;
		// handleClose();
	};

	return (
		<div>
			{/* <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 "> */}
			<form className="space-y-5" action="#">
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
				<div className="text-sm font-medium text-gray-500">
					Not registered?{"   "}
					<a
						href="#"
						className="text-blue-700 hover:underline dark:text-blue-500"
					>
						Create account
					</a>
				</div>
			</form>
			{/* </div>  */}
		</div>
	);
}
