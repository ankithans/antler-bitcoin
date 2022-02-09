import CustomAlert from "./components/common/CustomAlert";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import { AuthState } from "./context/authContext";

export default function App() {
	const { user } = AuthState();

	return (
		<div className="flex flex-col h-screen justify-between">
			<div>
				<Navbar />
				{user === null ? <Landing /> : <Dashboard />}
				<CustomAlert />
			</div>
			<Footer />
		</div>
	);
}
