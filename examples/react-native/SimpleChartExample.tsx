import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Text, Button } from "react-native";
import {
	Chart,
	LineSeries,
	BarSeries,
	CandlestickSeries,
	IChartApi,
} from "../../src/react-native";

// Sample data
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
	{ time: "2019-04-11", open: 78.11, high: 82.45, low: 76.85, close: 80.01 },
	{ time: "2019-04-12", open: 80.23, high: 98.85, low: 76.23, close: 96.63 },
	{ time: "2019-04-13", open: 96.45, high: 97.85, low: 74.76, close: 76.64 },
	{ time: "2019-04-14", open: 76.75, high: 83.95, low: 75.43, close: 81.89 },
	{ time: "2019-04-15", open: 81.89, high: 84.65, low: 72.56, close: 74.43 },
	{ time: "2019-04-16", open: 74.43, high: 81.35, low: 73.52, close: 80.01 },
	{ time: "2019-04-17", open: 80.01, high: 99.85, low: 79.32, close: 96.63 },
	{ time: "2019-04-18", open: 96.63, high: 97.54, low: 75.76, close: 76.64 },
	{ time: "2019-04-19", open: 76.64, high: 82.95, low: 75.43, close: 81.89 },
	{ time: "2019-04-20", open: 81.89, high: 84.65, low: 72.56, close: 74.43 },
];

const barData = [
	{ time: "2019-04-11", open: 78.11, high: 82.45, low: 76.85, close: 80.01 },
	{ time: "2019-04-12", open: 80.23, high: 98.85, low: 76.23, close: 96.63 },
	{ time: "2019-04-13", open: 96.45, high: 97.85, low: 74.76, close: 76.64 },
	{ time: "2019-04-14", open: 76.75, high: 83.95, low: 75.43, close: 81.89 },
	{ time: "2019-04-15", open: 81.89, high: 84.65, low: 72.56, close: 74.43 },
	{ time: "2019-04-16", open: 74.43, high: 81.35, low: 73.52, close: 80.01 },
	{ time: "2019-04-17", open: 80.01, high: 99.85, low: 79.32, close: 96.63 },
	{ time: "2019-04-18", open: 96.63, high: 97.54, low: 75.76, close: 76.64 },
	{ time: "2019-04-19", open: 76.64, high: 82.95, low: 75.43, close: 81.89 },
	{ time: "2019-04-20", open: 81.89, high: 84.65, low: 72.56, close: 74.43 },
];

enum ChartType {
	Line = "Line",
	Candle = "Candle",
	Bar = "Bar",
}

export default function SimpleChartExample() {
	const [chartType, setChartType] = useState<ChartType>(ChartType.Line);

	const handleChartReady = (chart: IChartApi) => {
		// Configure chart options after it's ready
		chart.applyOptions({
			layout: {
				background: { color: "#222" },
				textColor: "rgba(255, 255, 255, 0.9)",
			},
			grid: {
				vertLines: { color: "rgba(70, 70, 70, 0.5)" },
				horzLines: { color: "rgba(70, 70, 70, 0.5)" },
			},
			watermark: {
				visible: true,
				fontSize: 24,
				horzAlign: "center",
				vertAlign: "center",
				color: "rgba(170, 170, 170, 0.5)",
				text: "Lightweight Charts™",
			},
		} as any);

		// Add data based on chart type
		if (chartType === ChartType.Line) {
			const series = chart.addSeries(LineSeries, {
				color: "#2196F3",
				lineWidth: 2,
			} as any);
			series.setData(lineData);
		} else if (chartType === ChartType.Candle) {
			const series = chart.addSeries(CandlestickSeries, {
				upColor: "#26a69a",
				downColor: "#ef5350",
				borderVisible: false,
				wickUpColor: "#26a69a",
				wickDownColor: "#ef5350",
			} as any);
			series.setData(candlestickData);
		} else if (chartType === ChartType.Bar) {
			const series = chart.addSeries(BarSeries, {
				upColor: "#26a69a",
				downColor: "#ef5350",
			} as any);
			series.setData(barData);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Lightweight Charts React Native</Text>
				<View style={styles.buttonContainer}>
					<Button
						title="Line"
						onPress={() => setChartType(ChartType.Line)}
						color={chartType === ChartType.Line ? "#2196F3" : undefined}
					/>
					<Button
						title="Candle"
						onPress={() => setChartType(ChartType.Candle)}
						color={chartType === ChartType.Candle ? "#2196F3" : undefined}
					/>
					<Button
						title="Bar"
						onPress={() => setChartType(ChartType.Bar)}
						color={chartType === ChartType.Bar ? "#2196F3" : undefined}
					/>
				</View>
			</View>

			<View style={styles.chartContainer}>
				<Chart
					style={styles.chart}
					options={{
						width: 400,
						height: 300,
						timeScale: {
							timeVisible: true,
							secondsVisible: false,
						},
					} as any}
					onChartReady={handleChartReady}
					key={chartType} // Force re-render when chart type changes
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		padding: 16,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 8,
	},
	chartContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	chart: {
		width: "100%",
		height: 300,
		backgroundColor: "#fff",
		borderRadius: 8,
		overflow: "hidden",
	},
});
