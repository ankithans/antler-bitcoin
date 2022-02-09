import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function CustomLineChart({ datasets, labels, title }) {
	return (
		<div>
			<Line
				data={{
					labels: labels,
					datasets: datasets,
				}}
				options={{
					responsive: true,
					plugins: {
						legend: {
							position: "top",
						},
						title: {
							display: true,
							text: title,
						},
					},
					elements: {
						point: {
							radius: 1,
						},
					},
				}}
			/>
		</div>
	);
}
