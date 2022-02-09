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
		<div>
			{!loading && (
				<div className="flex flex-col mt-10 items-center">
					<div className="flex flex-col sm:flex-row  w-full md:px-0 md:w-2/3 xl:w-1/2 pb-4 pt-8 items-center bg-white sm:space-x-5">
						<div className="flex w-full m-3 sm:m-0 md:w-1/2 p-10 bg-gray-100 text-gray-600 rounded-md items-center">
							<div className="w-full">
								<h3 className="text-lg font-semibold leading-tight text-gray-800">
									Bitcoin Price
								</h3>
								<h6 className="text-sm leading-tight mb-2">
									<span>Bitcoin price in INR</span>
									&nbsp;&nbsp;-&nbsp;&nbsp;Aug 2nd 4:10pm AEST
								</h6>
								<div className="flex w-full items-end mb-6">
									<span className="block leading-none text-3xl text-gray-800">
										{466522}
									</span>
								</div>
							</div>
						</div>
						<div className="flex w-full m-3 sm:m-0 md:w-1/2 p-10 bg-gray-100 text-gray-600 rounded-md items-center">
							<div className="w-full">
								<h3 className="text-lg font-semibold leading-tight text-gray-800">
									Bitcoin Price
								</h3>
								<h6 className="text-sm leading-tight mb-2">
									<span>Bitcoin price in INR</span>
									&nbsp;&nbsp;-&nbsp;&nbsp;Aug 2nd 4:10pm AEST
								</h6>
								<div className="flex w-full items-end mb-6">
									<span className="block leading-none text-3xl text-gray-800">
										{466522}
									</span>
								</div>
							</div>
						</div>
					</div>

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
