import CustomAlert from "./components/common/CustomAlert";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import { AuthState } from "./context/authContext";
import { CircularProgress } from "@mui/material";

export default function App() {
	const { loading } = AuthState();

	if (loading)
		return (
			<div className="flex h-screen justify-center items-center">
				<CircularProgress className="self-center" />
			</div>
		);
	return (
		<div className="flex flex-col h-screen justify-between">
			<div>
				<Navbar />
				{localStorage.getItem("loggedIn") === "false" ||
				localStorage.getItem("loggedIn") == null ? (
					<Landing />
				) : (
					<Dashboard />
				)}
				<CustomAlert />
			</div>
			<Footer />
		</div>
	);
}
