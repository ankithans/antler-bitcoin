import { createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useState } from "react";
import { AuthState } from "../../context/authContext";
import { auth, db } from "../../firebase";
import { CircularProgress } from "@mui/material";

export default function SignUpForm({ handleClose, setIsLoginForm }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const { setAlert } = AuthState();

	const handleSubmit = async (event) => {
		setLoading(true);
		event.preventDefault();

		if (email === "" || password === "" || confirmPassword === "") {
			setLoading(false);
			return;
		}
		if (password !== confirmPassword) {
			setAlert({
				open: true,
				message: "please re-confirm the password",
				type: "error",
			});
			return;
		}

		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			console.log(result);

			const usersRef = doc(db, "users", result.user.uid);
			await setDoc(usersRef, {
				email: result.user.email,
				createdAt: result.user.metadata.creationTime,
				lastSignInAt: result.user.metadata.lastSignInTime,
			});

			handleClose();

			setAlert({
				open: true,
				message: `Sign Up Successfull. Welcome ${result.user.email}`,
				type: "success",
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);

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
						htmlFor="password"
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
					{loading ? (
						<CircularProgress size={20} style={{ color: "#fff" }} />
					) : (
						"Create account"
					)}
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
