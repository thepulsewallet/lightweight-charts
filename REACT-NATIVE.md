# Lightweight Charts for React Native

This is the React Native version of [TradingView Lightweight Charts™](https://github.com/tradingview/lightweight-charts), a charting library for displaying financial data.

## Installation

```bash
npm install lightweight-charts-react-native
```

### Dependencies

This library depends on:

- [react-native-canvas](https://github.com/iddan/react-native-canvas)
- [react-native-webview](https://github.com/react-native-webview/react-native-webview)

Make sure to install these dependencies:

```bash
npm install react-native-canvas react-native-webview
```

For iOS, you also need to run:

```bash
cd ios && pod install
```

## Quick Start Example

```jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Chart, LineSeries } from "lightweight-charts-react-native";

export default function SimpleChart() {
	const handleChartReady = (chart) => {
		const lineSeries = chart.addSeries(LineSeries);
		lineSeries.setData([
			{ time: "2019-04-11", value: 80.01 },
			{ time: "2019-04-12", value: 96.63 },
			{ time: "2019-04-13", value: 76.64 },
			{ time: "2019-04-14", value: 81.89 },
			{ time: "2019-04-15", value: 74.43 },
		]);
	};

	return (
		<View style={styles.container}>
			<Chart
				style={styles.chart}
				options={{
					width: 400,
					height: 300,
				}}
				onChartReady={handleChartReady}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	chart: {
		width: "100%",
		height: 300,
	},
});
```

## Components

### Chart

The main component for rendering a chart.

#### Props

| Name           | Type                         | Description                                         |
| -------------- | ---------------------------- | --------------------------------------------------- |
| `style`        | `ViewStyle`                  | React Native style for the chart container          |
| `options`      | `DeepPartial<ChartOptions>`  | Chart options (same as web version)                 |
| `onChartReady` | `(chart: IChartApi) => void` | Callback when chart is initialized and ready to use |

## API

### Chart API

The `onChartReady` callback provides access to the chart instance, which offers these methods:

| Method                                 | Description                             |
| -------------------------------------- | --------------------------------------- |
| `resize(width, height, forceRepaint?)` | Resizes the chart to new dimensions     |
| `applyOptions(options)`                | Updates chart options                   |
| `addSeries(seriesType, options?)`      | Adds a new series to the chart          |
| `removeSeries(series)`                 | Removes a series from the chart         |
| `subscribeClick(handler)`              | Subscribes to chart click events        |
| `unsubscribeClick(handler)`            | Unsubscribes from chart click events    |
| `subscribeCrosshairMove(handler)`      | Subscribes to crosshair move events     |
| `unsubscribeCrosshairMove(handler)`    | Unsubscribes from crosshair move events |
| `timeScale()`                          | Returns the time scale API              |

### Series Types

The library supports the following series types:

- `LineSeries` - Simple line chart
- `AreaSeries` - Area chart with fill below the line
- `BarSeries` - OHLC bar chart
- `CandlestickSeries` - Candlestick chart
- `HistogramSeries` - Histogram chart
- `BaselineSeries` - Baseline chart showing areas above/below a baseline

## Examples

See the [examples directory](./examples/react-native/) for more detailed examples.

### Line Chart

```jsx
import { Chart, LineSeries } from "lightweight-charts-react-native";

// In your component
const handleChartReady = (chart) => {
	const series = chart.addSeries(LineSeries, {
		color: "#2196F3",
		lineWidth: 2,
	});

	series.setData([
		{ time: "2019-04-11", value: 80.01 },
		{ time: "2019-04-12", value: 96.63 },
		{ time: "2019-04-13", value: 76.64 },
		{ time: "2019-04-14", value: 81.89 },
		{ time: "2019-04-15", value: 74.43 },
	]);
};
```

### Candlestick Chart

```jsx
import { Chart, CandlestickSeries } from "lightweight-charts-react-native";

// In your component
const handleChartReady = (chart) => {
	const series = chart.addSeries(CandlestickSeries, {
		upColor: "#26a69a",
		downColor: "#ef5350",
		borderVisible: false,
		wickUpColor: "#26a69a",
		wickDownColor: "#ef5350",
	});

	series.setData([
		{ time: "2019-04-11", open: 78.11, high: 82.45, low: 76.85, close: 80.01 },
		{ time: "2019-04-12", open: 80.23, high: 98.85, low: 76.23, close: 96.63 },
		{ time: "2019-04-13", open: 96.45, high: 97.85, low: 74.76, close: 76.64 },
		{ time: "2019-04-14", open: 76.75, high: 83.95, low: 75.43, close: 81.89 },
		{ time: "2019-04-15", open: 81.89, high: 84.65, low: 72.56, close: 74.43 },
	]);
};
```

## Advanced Options

The chart accepts the same options as the web version. Here's an example with customized appearance:

```jsx
<Chart
	style={styles.chart}
	options={{
		width: 400,
		height: 300,
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
		timeScale: {
			timeVisible: true,
			secondsVisible: false,
		},
	}}
	onChartReady={handleChartReady}
/>
```

## Limitations

- The React Native version currently uses react-native-canvas, which renders the chart using WebView. This might have performance implications for complex charts or animations.
- Touch interactions might feel slightly different from native React Native components.
- Some advanced features of the web version may have limited functionality.

## License

Licensed under the Apache License, Version 2.0.

This product includes software developed by TradingView, Inc. (https://www.tradingview.com/).
