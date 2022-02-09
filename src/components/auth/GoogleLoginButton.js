import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { auth, db } from "../../firebase";
import { AuthState } from "../../context/authContext";

export default function GoogleLoginButton({ handleClose }) {
	const { setAlert } = AuthState();
	const googleProvider = new GoogleAuthProvider();

	const handleSubmit = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);

			const usersRef = doc(db, "users", result.user.uid);
			await setDoc(usersRef, {
				email: result.user.email,
				createdAt: result.user.metadata.creationTime,
				lastSignInAt: result.user.metadata.lastSignInTime,
			});

			handleClose();

			setAlert({
				open: true,
				message: `Sign In Successfull. Welcome ${result.user.email}`,
				type: "success",
			});
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
			<button
				type="button"
				onClick={handleSubmit}
				className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
			>
				<svg
					className="mr-2 ml-7 xl:ml-16 w-4 h-4"
					aria-hidden="true"
					focusable="false"
					data-prefix="fab"
					data-icon="google"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 488 512"
				>
					<path
						fill="currentColor"
						d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
					></path>
				</svg>
				Sign in with Google
			</button>
			<div className="relative flex pt-5 items-center">
				<div className="flex-grow border-t border-gray-300"></div>
				<span className="flex-shrink mx-4 text-gray-300">Or</span>
				<div className="flex-grow border-t border-gray-300"></div>
			</div>
		</div>
	);
}
