import CustomAlert from "./components/common/CustomAlert";
import Navbar from "./components/common/Navbar";
import BitcoinChart from "./components/home/BitcoinChart";

export default function App() {
	return (
		<div>
			<Navbar />
			<BitcoinChart />
			<CustomAlert />
		</div>
	);
}
