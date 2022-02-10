import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getDocs, collection } from "@firebase/firestore";
import { db } from "../../firebase";
import { AuthState } from "../../context/authContext";
import CustomLineChart from "./CustomLineChart";
import { CircularProgress } from "@mui/material";

export default function BitcoinChart() {
	const [historicalData, setHistoricalData] = useState([
		{
			id: 1,
			inr: 1,
			usd: 1,
		},
	]);
	const { setAlert } = AuthState();
	const [loading, setLoading] = useState(true);

	const fetchHistoricalData = async () => {
		try {
			const response = await getDocs(collection(db, "bitcoin"));

			var newHistoricalData = response.docs.map((item) => ({
				...item.data(),
				id: new Date(Date.parse(item.id)).toUTCString(),
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
		setLoading(true);

		fetchHistoricalData();
	}, []);

	return (
		<div>
			{loading ? (
				<div className="flex  mt-80 justify-center items-center">
					<CircularProgress />
				</div>
			) : (
				<div className="flex flex-col mt-0 sm:mt-9 items-center">
					<div className="flex flex-col sm:flex-row  w-full md:px-0 md:w-2/3 xl:w-1/2 pb-4 pt-8 items-center bg-white sm:space-x-5">
						<div className="flex w-full m-3 sm:m-0 md:w-1/2 p-10 bg-gray-100 text-gray-600 rounded-md items-center">
							<div className="w-full">
								<h3 className="text-lg font-semibold leading-tight text-gray-800">
									Bitcoin Price in INR
								</h3>
								<h6 className="text-sm leading-tight mb-2 mt-1">
									<span>Last updated</span>
									&nbsp;&nbsp;-&nbsp;&nbsp;
									{
										historicalData[
											historicalData.length - 1
										].id
									}
								</h6>
								<div className="flex w-full items-end mb-6">
									<span className="block leading-none text-3xl text-gray-800">
										₹
										<CountUp
											separator=","
											end={
												historicalData[
													historicalData.length - 1
												].inr
											}
										/>
									</span>
								</div>
							</div>
						</div>
						<div className="flex w-full m-3 sm:m-0 md:w-1/2 p-10 bg-gray-100 text-gray-600 rounded-md items-center">
							<div className="w-full">
								<h3 className="text-lg font-semibold leading-tight text-gray-800">
									Bitcoin Price in USD
								</h3>
								<h6 className="text-sm leading-tight mb-2 mt-1">
									<span>Last updated</span>
									&nbsp;&nbsp;-&nbsp;&nbsp;
									{
										historicalData[
											historicalData.length - 1
										].id
									}
								</h6>
								<div className="flex w-full items-end mb-6">
									<span className="block leading-none text-3xl text-gray-800">
										$
										<CountUp
											separator=","
											end={
												historicalData[
													historicalData.length - 1
												].usd
											}
										/>
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
								tension: 0.5,
								pointRadius: 0.6,
								borderWidth: 2.5,
							},
						]}
					/>
				</div>
			)}
		</div>
	);
}
