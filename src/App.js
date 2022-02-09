import CustomAlert from "./components/common/CustomAlert";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import BitcoinChart from "./components/home/BitcoinChart";

export default function App() {
	return (
		<div className="flex flex-col h-screen justify-between">
			<div>
				<Navbar />
				<BitcoinChart />
				<CustomAlert />
			</div>
			<Footer />
		</div>
	);
}
