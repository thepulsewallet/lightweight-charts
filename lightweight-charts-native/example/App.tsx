import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import {
	Chart,
	LineSeries,
	AreaSeries,
	CandlestickSeries,
	BarSeries,
	HistogramSeries,
} from "../src";

const lineData = [
	{ time: "2019-04-11", value: 80.01 },
	{ time: "2019-04-12", value: 96.63 },
	{ time: "2019-04-13", value: 76.64 },
	{ time: "2019-04-14", value: 81.89 },
	{ time: "2019-04-15", value: 74.43 },
	{ time: "2019-04-16", value: 80.01 },
	{ time: "2019-04-17", value: 96.63 },
	{ time: "2019-04-18", value: 76.64 },
	{ time: "2019-04-19", value: 81.89 },
	{ time: "2019-04-20", value: 74.43 },
];

const candlestickData = [
	{ time: "2019-04-11", open: 78.11, high: 82.15, low: 76.21, close: 80.01 },
	{ time: "2019-04-12", open: 80.11, high: 98.23, low: 79.65, close: 96.63 },
	{ time: "2019-04-13", open: 96.45, high: 97.21, low: 74.32, close: 76.64 },
	{ time: "2019-04-14", open: 76.65, high: 84.98, low: 75.25, close: 81.89 },
	{ time: "2019-04-15", open: 81.89, high: 82.54, low: 72.18, close: 74.43 },
	{ time: "2019-04-16", open: 74.43, high: 83.21, low: 73.98, close: 80.01 },
	{ time: "2019-04-17", open: 80.01, high: 97.21, low: 79.65, close: 96.63 },
	{ time: "2019-04-18", open: 96.63, high: 97.21, low: 74.32, close: 76.64 },
	{ time: "2019-04-19", open: 76.64, high: 84.98, low: 75.25, close: 81.89 },
	{ time: "2019-04-20", open: 81.89, high: 82.54, low: 72.18, close: 74.43 },
];

const histogramData = [
	{ time: "2019-04-11", value: 80.01 },
	{ time: "2019-04-12", value: 96.63, color: "rgba(255, 82, 82, 0.8)" },
	{ time: "2019-04-13", value: 76.64 },
	{ time: "2019-04-14", value: 81.89, color: "rgba(255, 82, 82, 0.8)" },
	{ time: "2019-04-15", value: 74.43 },
	{ time: "2019-04-16", value: 80.01, color: "rgba(255, 82, 82, 0.8)" },
	{ time: "2019-04-17", value: 96.63 },
	{ time: "2019-04-18", value: 76.64, color: "rgba(255, 82, 82, 0.8)" },
	{ time: "2019-04-19", value: 81.89 },
	{ time: "2019-04-20", value: 74.43, color: "rgba(255, 82, 82, 0.8)" },
];

const App = () => {
	const [chartType, setChartType] = useState<
		"line" | "area" | "candlestick" | "bar" | "histogram"
	>("line");
	const chartRef = useRef(null);
	const chartWidth = 380;
	const chartHeight = 300;

	const getChartOptions = () => {
		const baseOptions = {
			width: chartWidth,
			height: chartHeight,
			layout: {
				background: { color: "#222" },
				textColor: "#DDD",
			},
			grid: {
				vertLines: { color: "#444" },
				horzLines: { color: "#444" },
			},
			timeScale: {
				borderColor: "#555",
				timeVisible: true,
			},
		};

		return baseOptions;
	};

	const renderChart = () => {
		return (
			<Chart
				width={chartWidth}
				height={chartHeight}
				options={getChartOptions()}
				ref={(chart) => {
					chartRef.current = chart;
					if (chart) {
						switch (chartType) {
							case "line":
								renderLineSeries(chart);
								break;
							case "area":
								renderAreaSeries(chart);
								break;
							case "candlestick":
								renderCandlestickSeries(chart);
								break;
							case "bar":
								renderBarSeries(chart);
								break;
							case "histogram":
								renderHistogramSeries(chart);
								break;
						}
					}
				}}
			/>
		);
	};

	const renderLineSeries = (chart: any) => {
		const series = chart.addLineSeries({
			color: "#2962FF",
			lineWidth: 2,
			crosshairMarkerVisible: true,
		});
		series.setData(lineData);
	};

	const renderAreaSeries = (chart: any) => {
		const series = chart.addAreaSeries({
			topColor: "rgba(46, 220, 135, 0.56)",
			bottomColor: "rgba(46, 220, 135, 0.04)",
			lineColor: "rgba(46, 220, 135, 1)",
			lineWidth: 2,
		});
		series.setData(lineData);
	};

	const renderCandlestickSeries = (chart: any) => {
		const series = chart.addCandlestickSeries({
			upColor: "#26a69a",
			downColor: "#ef5350",
			borderVisible: true,
			wickVisible: true,
		});
		series.setData(candlestickData);
	};

	const renderBarSeries = (chart: any) => {
		const series = chart.addBarSeries({
			upColor: "#26a69a",
			downColor: "#ef5350",
		});
		series.setData(candlestickData);
	};

	const renderHistogramSeries = (chart: any) => {
		const series = chart.addHistogramSeries({
			color: "#26a69a",
		});
		series.setData(histogramData);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Lightweight Charts Native</Text>
			</View>

			<View style={styles.chartContainer}>{renderChart()}</View>

			<View style={styles.controls}>
				<Text style={styles.controlTitle}>Chart Type:</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.buttonRow}
				>
					<ChartTypeButton
						title="Line"
						active={chartType === "line"}
						onPress={() => setChartType("line")}
					/>
					<ChartTypeButton
						title="Area"
						active={chartType === "area"}
						onPress={() => setChartType("area")}
					/>
					<ChartTypeButton
						title="Candlestick"
						active={chartType === "candlestick"}
						onPress={() => setChartType("candlestick")}
					/>
					<ChartTypeButton
						title="Bar"
						active={chartType === "bar"}
						onPress={() => setChartType("bar")}
					/>
					<ChartTypeButton
						title="Histogram"
						active={chartType === "histogram"}
						onPress={() => setChartType("histogram")}
					/>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const ChartTypeButton = ({
	title,
	active,
	onPress,
}: {
	title: string;
	active: boolean;
	onPress: () => void;
}) => (
	<TouchableOpacity
		style={[styles.button, active && styles.activeButton]}
		onPress={onPress}
	>
		<Text style={[styles.buttonText, active && styles.activeButtonText]}>
			{title}
		</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#131722",
	},
	header: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#2a2e39",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#d1d4dc",
		textAlign: "center",
	},
	chartContainer: {
		alignItems: "center",
		padding: 16,
	},
	controls: {
		padding: 16,
	},
	controlTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#d1d4dc",
		marginBottom: 10,
	},
	buttonRow: {
		flexDirection: "row",
	},
	button: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: "#2a2e39",
		borderRadius: 20,
		marginRight: 10,
	},
	activeButton: {
		backgroundColor: "#2962FF",
	},
	buttonText: {
		color: "#d1d4dc",
		fontSize: 14,
	},
	activeButtonText: {
		color: "white",
		fontWeight: "bold",
	},
});

export default App;
