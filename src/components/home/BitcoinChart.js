import { useEffect, useState } from "react";

import { doc, getDocs, collection } from "@firebase/firestore";
import { db } from "../../firebase";
import { AuthState } from "../../context/authContext";
import CustomLineChart from "./CustomLineChart";

export default function BitcoinChart() {
	const [historicalData, setHistoricalData] = useState([]);
	const { setAlert } = AuthState();
	const [loading, setLoading] = useState(false);

	const fetchHistoricalData = async () => {
		try {
			setLoading(true);
			const response = await getDocs(collection(db, "bitcoin"));

			var newHistoricalData = response.docs.map((item) => ({
				...item.data(),
				id: item.id,
			}));

			setHistoricalData(newHistoricalData);

			setAlert({
				open: true,
				message: "historical data loaded",
				type: "success",
			});
			setLoading(false);
		} catch (error) {
			setAlert({
				open: true,
				message: error.message,
				type: "error",
			});
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchHistoricalData();
		console.log(historicalData);
	}, []);

	return (
		<div className="">
			{!loading && (
				<div className="">
					<CustomLineChart
						title="Bitcoin Price in USD"
						labels={historicalData.map((item) => {
							var d = new Date(Date.parse(item.id));
							return `${d.toString().substring(4, 21)}`;
						})}
						datasets={[
							{
								data: historicalData.map((item) => item.usd),
								label: "USD",
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								borderColor: "rgba(255, 255, 255, 1)",
								pointBackgroundColor: "rgba(255, 255, 255, 1)",
								fill: "start",
								tension: 0.4,
							},
						]}
					/>
				</div>
			)}
		</div>
	);
}
