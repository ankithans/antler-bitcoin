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
		<div className="flex">
			{/* <div></div> */}
			{/* <div> */}
			{!loading && (
				<div className="w-1/2">
					<CustomLineChart
						title="Bitcoin Price in INR"
						labels={historicalData.map((item) => item.id)}
						datasets={[
							{
								data: historicalData.map((item) => item.inr),
								label: "INR",
								borderColor: "#7494EA",
							},
						]}
					/>
				</div>
			)}

			{!loading && (
				<div className="w-1/2">
					<CustomLineChart
						title="Bitcoin Price in USD"
						labels={historicalData.map((item) => item.id)}
						datasets={[
							{
								data: historicalData.map((item) => item.usd),
								label: "USD",
								borderColor: "#35FF69",
							},
						]}
					/>
				</div>
			)}

			{!loading && (
				<div className="w-1/2">
					<CustomLineChart
						title="Bitcoin Price INR vs USD"
						labels={historicalData.map((item) => item.id)}
						datasets={[
							{
								data: historicalData.map((item) => item.inr),
								label: "INR",
								borderColor: "#7494EA",
							},
							{
								data: historicalData.map((item) => item.usd),
								label: "USD",
								borderColor: "#35FF69",
							},
						]}
					/>
				</div>
			)}
			{/* </div> */}
		</div>
	);
}
