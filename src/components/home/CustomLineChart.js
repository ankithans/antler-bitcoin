import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const options = {
	plugins: {
		legend: {
			display: false,
		},
	},
	scales: {
		y: {
			ticks: {
				color: "rgba(255, 255, 255, 1)",
			},
			grid: {
				display: false,
				drawBorder: false,
			},
		},

		x: {
			ticks: {
				color: "rgba(255, 255, 255, 1)",
			},
			grid: {
				circular: true,
				borderColor: "rgba(255, 255, 255, .2)",
				color: "rgba(255, 255, 255, .2)",
				borderDash: [5, 5],
			},
		},
	},
	layout: {
		padding: {
			right: 10,
		},
	},
};

export default function CustomLineChart({ datasets, labels, title }) {
	return (
		<div className="md:w-2/3 xl:w-1/2 px-5 pb-4 pt-8 bg-gray-700 text-white items-center rounded-md">
			<Line
				data={{
					labels: labels,
					datasets: datasets,
				}}
				options={options}
			/>
		</div>
	);
}
