import { useState } from "react";
import { AuthState } from "../../context/authContext";
import Auth from "../../pages/Auth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const { user, setAlert } = AuthState();

	const handleLogout = async () => {
		try {
			const result = await signOut(auth);
			console.log(result);

			setAlert({
				open: true,
				message: `Logged out user ${user.email}`,
				type: "info",
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
			<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
				<div className="container flex flex-wrap justify-between items-center mx-auto">
					<button className="flex">
						<img
							alt="logo"
							className="pr-3 h-10 mb-1"
							src="https://img.icons8.com/color/80/000000/baratheon-house.png"
						/>
						<span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
							Antler Bit
						</span>
					</button>
					<div className="flex md:order-2">
						{localStorage.getItem("loggedIn") === "true" ? (
							<button
								type="button"
								onClick={handleLogout}
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Logout
							</button>
						) : (
							<button
								type="button"
								onClick={handleOpen}
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Login / SignUp
							</button>
						)}
						<Auth open={open} handleClose={handleClose} />
						<button
							data-collapse-toggle="mobile-menu-4"
							type="button"
							className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="mobile-menu-4"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clipRule="evenodd"
								></path>
							</svg>
							<svg
								className="hidden w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</div>
					<div
						className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
						id="mobile-menu-4"
					>
						<ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
							<li>
								<button
									href="#"
									className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
									aria-current="page"
								>
									Home
								</button>
							</li>
							<li>
								<button
									href="#"
									className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									About
								</button>
							</li>
							<li>
								<button
									href="#"
									className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									Services
								</button>
							</li>
							<li>
								<button
									href="#"
									className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									Contact
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}
