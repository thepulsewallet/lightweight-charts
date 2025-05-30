# Lightweight Charts Native

A React Native port of TradingView's Lightweight Charts library. This library provides financial charts for React Native applications without using WebView.

## Installation

```bash
npm install lightweight-charts-native @shopify/react-native-skia
```

or

```bash
yarn add lightweight-charts-native @shopify/react-native-skia
```

> Note: This library requires `@shopify/react-native-skia` as a peer dependency to render charts.

## Basic Usage

```jsx
import React from "react";
import { View } from "react-native";
import { Chart, LineSeries } from "lightweight-charts-native";

const App = () => {
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

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Chart
				width={350}
				height={300}
				options={{
					layout: {
						background: { color: "#222" },
						textColor: "#DDD",
					},
					grid: {
						vertLines: { color: "#444" },
						horzLines: { color: "#444" },
					},
				}}
				ref={(chart) => {
					if (chart) {
						// Create a line series
						const lineSeries = chart.addLineSeries({
							color: "#2962FF",
							lineWidth: 2,
						});

						// Set the data
						lineSeries.setData(lineData);
					}
				}}
			/>
		</View>
	);
};

export default App;
```

## Advanced Usage - Imperative API

```jsx
import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { createChart, AreaSeries, LineStyle } from "lightweight-charts-native";

const App = () => {
	const containerRef = useRef(null);
	const chartRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current) return;

		// Create the chart
		const chart = createChart(containerRef.current, {
			width: 350,
			height: 300,
			layout: {
				background: { color: "#131722" },
				textColor: "#d1d4dc",
			},
			grid: {
				vertLines: { color: "#242832" },
				horzLines: { color: "#242832" },
			},
			timeScale: {
				borderColor: "#242832",
			},
		});

		chartRef.current = chart;

		// Create an area series
		const areaSeries = chart.addAreaSeries({
			topColor: "rgba(38, 198, 218, 0.56)",
			bottomColor: "rgba(38, 198, 218, 0.04)",
			lineColor: "rgba(38, 198, 218, 1)",
			lineWidth: 2,
		});

		// Set area series data
		areaSeries.setData([
			{ time: "2018-12-22", value: 32.51 },
			{ time: "2018-12-23", value: 31.11 },
			{ time: "2018-12-24", value: 27.02 },
			{ time: "2018-12-25", value: 27.32 },
			{ time: "2018-12-26", value: 25.17 },
			{ time: "2018-12-27", value: 28.89 },
			{ time: "2018-12-28", value: 25.46 },
			{ time: "2018-12-29", value: 23.92 },
			{ time: "2018-12-30", value: 22.68 },
			{ time: "2018-12-31", value: 22.67 },
		]);

		return () => {
			// Clean up
			chart.remove();
		};
	}, []);

	return <View ref={containerRef} style={{ width: 350, height: 300 }} />;
};

export default App;
```

## Chart Types

The library supports the following chart types:

- Line Chart
- Area Chart
- Bar Chart
- Candlestick Chart
- Histogram Chart

## API Reference

### Chart Component Props

| Prop      | Type              | Description                       |
| --------- | ----------------- | --------------------------------- |
| `width`   | `number`          | Width of the chart in pixels      |
| `height`  | `number`          | Height of the chart in pixels     |
| `options` | `ChartOptions`    | Chart configuration options       |
| `ref`     | `React.RefObject` | Reference to access chart methods |

### Chart Methods

| Method                 | Description                            |
| ---------------------- | -------------------------------------- |
| `addLineSeries`        | Adds a line series to the chart        |
| `addAreaSeries`        | Adds an area series to the chart       |
| `addBarSeries`         | Adds a bar series to the chart         |
| `addCandlestickSeries` | Adds a candlestick series to the chart |
| `addHistogramSeries`   | Adds a histogram series to the chart   |
| `timeScale`            | Returns the time scale API             |
| `priceScale`           | Returns the price scale API            |
| `applyOptions`         | Applies new options to the chart       |
| `resize`               | Resizes the chart                      |

### Series Methods

| Method         | Description                                   |
| -------------- | --------------------------------------------- |
| `setData`      | Sets the series data                          |
| `update`       | Updates the last data point or adds a new one |
| `applyOptions` | Applies new options to the series             |

## Differences from Original Library

This React Native port has some differences from the original Lightweight Charts library:

1. **Rendering**: Uses React Native Skia instead of HTML5 Canvas
2. **Performance**: May have different performance characteristics due to the mobile environment
3. **API**: Maintains similar API structure but with some adaptations for React Native
4. **Features**: Some advanced features may not be fully implemented yet

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This library is licensed under the Apache License, Version 2.0, following the same license as the original Lightweight Charts library by TradingView.
