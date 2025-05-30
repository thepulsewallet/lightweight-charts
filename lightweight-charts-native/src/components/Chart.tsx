import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import SkiaCanvas, { SkiaCanvasRenderingContext } from "../canvas/SkiaCanvas";
import {
	ChartOptions,
	Time,
	SeriesType,
	SeriesOptionsMap,
	SeriesDataItemTypeMap,
} from "../types";
import { defaultChartOptions } from "../defaults";
import { deepMerge } from "../helpers/utils";

export interface ChartProps {
	width: number;
	height: number;
	options?: Partial<ChartOptions>;
}

// Interface for series methods
export interface ISeriesApi<T extends SeriesType> {
	setData: (data: SeriesDataItemTypeMap[T][]) => void;
	update: (data: SeriesDataItemTypeMap[T]) => void;
	applyOptions: (options: Partial<SeriesOptionsMap[T]>) => void;
	options: () => SeriesOptionsMap[T];
}

// Chart API interface
export interface IChartApi {
	resize: (width: number, height: number) => void;
	addLineSeries: (
		options?: Partial<SeriesOptionsMap["Line"]>
	) => ISeriesApi<"Line">;
	addAreaSeries: (
		options?: Partial<SeriesOptionsMap["Area"]>
	) => ISeriesApi<"Area">;
	addBarSeries: (
		options?: Partial<SeriesOptionsMap["Bar"]>
	) => ISeriesApi<"Bar">;
	addCandlestickSeries: (
		options?: Partial<SeriesOptionsMap["Candlestick"]>
	) => ISeriesApi<"Candlestick">;
	addHistogramSeries: (
		options?: Partial<SeriesOptionsMap["Histogram"]>
	) => ISeriesApi<"Histogram">;
	timeScale: () => {
		scrollToPosition: (position: number) => void;
		scrollToRealTime: () => void;
		fitContent: () => void;
		getVisibleRange: () => { from: Time; to: Time } | null;
		setVisibleRange: (range: { from: Time; to: Time }) => void;
	};
	priceScale: () => {
		applyOptions: (options: any) => void;
	};
	applyOptions: (options: Partial<ChartOptions>) => void;
	options: () => ChartOptions;
	remove: () => void;
}

/**
 * Chart class that implements the IChartApi interface
 */
class ChartApiImpl implements IChartApi {
	private _options: ChartOptions;
	private _context: SkiaCanvasRenderingContext | null = null;
	private _width: number;
	private _height: number;
	private _series: Array<{
		type: SeriesType;
		options: any;
		data: any[];
		api: any;
	}> = [];
	private _forceUpdate: () => void;

	constructor(
		width: number,
		height: number,
		options: Partial<ChartOptions> = {},
		forceUpdate: () => void
	) {
		this._width = width;
		this._height = height;
		this._options = deepMerge(defaultChartOptions, options);
		this._forceUpdate = forceUpdate;
	}

	setContext(context: SkiaCanvasRenderingContext) {
		this._context = context;
		this._renderChart(); // Initial render
	}

	resize(width: number, height: number): void {
		this._width = width;
		this._height = height;
		this._renderChart();
	}

	addLineSeries(
		options?: Partial<SeriesOptionsMap["Line"]>
	): ISeriesApi<"Line"> {
		return this._addSeries("Line", options || {});
	}

	addAreaSeries(
		options?: Partial<SeriesOptionsMap["Area"]>
	): ISeriesApi<"Area"> {
		return this._addSeries("Area", options || {});
	}

	addBarSeries(options?: Partial<SeriesOptionsMap["Bar"]>): ISeriesApi<"Bar"> {
		return this._addSeries("Bar", options || {});
	}

	addCandlestickSeries(
		options?: Partial<SeriesOptionsMap["Candlestick"]>
	): ISeriesApi<"Candlestick"> {
		return this._addSeries("Candlestick", options || {});
	}

	addHistogramSeries(
		options?: Partial<SeriesOptionsMap["Histogram"]>
	): ISeriesApi<"Histogram"> {
		return this._addSeries("Histogram", options || {});
	}

	timeScale() {
		return {
			scrollToPosition: (position: number) => {
				// Implementation
			},
			scrollToRealTime: () => {
				// Implementation
			},
			fitContent: () => {
				// Implementation
			},
			getVisibleRange: () => {
				// Implementation
				return null;
			},
			setVisibleRange: (range: { from: Time; to: Time }) => {
				// Implementation
			},
		};
	}

	priceScale() {
		return {
			applyOptions: (options: any) => {
				// Implementation
			},
		};
	}

	applyOptions(options: Partial<ChartOptions>): void {
		this._options = deepMerge(this._options, options);
		this._renderChart();
	}

	options(): ChartOptions {
		return this._options;
	}

	remove(): void {
		// Clean up resources
	}

	private _addSeries<T extends SeriesType>(
		type: T,
		options: Partial<SeriesOptionsMap[T]>
	): ISeriesApi<T> {
		const seriesOptions = deepMerge(
			this._getDefaultOptionsForSeries(type),
			options
		) as SeriesOptionsMap[T];

		const seriesApi = {
			setData: (data: SeriesDataItemTypeMap[T][]) => {
				const seriesIndex = this._series.length;
				this._series[seriesIndex].data = data;
				this._renderChart();
			},
			update: (data: SeriesDataItemTypeMap[T]) => {
				const seriesIndex = this._series.length;
				this._series[seriesIndex].data.push(data);
				this._renderChart();
			},
			applyOptions: (options: Partial<SeriesOptionsMap[T]>) => {
				const seriesIndex = this._series.length;
				this._series[seriesIndex].options = deepMerge(
					this._series[seriesIndex].options,
					options
				);
				this._renderChart();
			},
			options: () => {
				const seriesIndex = this._series.length;
				return this._series[seriesIndex].options;
			},
		};

		this._series.push({
			type,
			options: seriesOptions,
			data: [],
			api: seriesApi,
		});

		return seriesApi as ISeriesApi<T>;
	}

	private _getDefaultOptionsForSeries(type: SeriesType): any {
		// Return default options based on series type
		switch (type) {
			case "Line":
				return { color: "rgba(56, 121, 217, 1)", lineWidth: 2 };
			case "Area":
				return {
					topColor: "rgba(56, 121, 217, 0.4)",
					bottomColor: "rgba(56, 121, 217, 0.1)",
					lineColor: "rgba(56, 121, 217, 1)",
					lineWidth: 2,
				};
			case "Bar":
				return { upColor: "#26a69a", downColor: "#ef5350", thinBars: true };
			case "Candlestick":
				return {
					upColor: "#26a69a",
					downColor: "#ef5350",
					borderVisible: true,
					wickVisible: true,
				};
			case "Histogram":
				return { color: "rgba(56, 121, 217, 1)" };
			default:
				return {};
		}
	}

	private _renderChart() {
		if (!this._context) return;

		// Clear canvas
		this._context.clearRect(0, 0, this._width, this._height);

		// Set background
		const bgColor = this._options.layout?.background?.color || "#ffffff";
		this._context.fillStyle = bgColor;
		this._context.fillRect(0, 0, this._width, this._height);

		// Render grid
		this._renderGrid();

		// Render series
		this._renderSeries();

		// Force React to update
		this._forceUpdate();
	}

	private _renderGrid() {
		// Implementation for rendering grid lines
	}

	private _renderSeries() {
		// Implementation for rendering all series data
		this._series.forEach((series) => {
			switch (series.type) {
				case "Line":
					this._renderLineSeries(series.data, series.options);
					break;
				case "Area":
					this._renderAreaSeries(series.data, series.options);
					break;
				case "Bar":
					this._renderBarSeries(series.data, series.options);
					break;
				case "Candlestick":
					this._renderCandlestickSeries(series.data, series.options);
					break;
				case "Histogram":
					this._renderHistogramSeries(series.data, series.options);
					break;
			}
		});
	}

	private _renderLineSeries(data: any[], options: any) {
		// Implementation for rendering line series
	}

	private _renderAreaSeries(data: any[], options: any) {
		// Implementation for rendering area series
	}

	private _renderBarSeries(data: any[], options: any) {
		// Implementation for rendering bar series
	}

	private _renderCandlestickSeries(data: any[], options: any) {
		// Implementation for rendering candlestick series
	}

	private _renderHistogramSeries(data: any[], options: any) {
		// Implementation for rendering histogram series
	}
}

const Chart: React.FC<ChartProps> = ({ width, height, options = {} }) => {
	const [forceUpdate, setForceUpdate] = useState(0);
	const chartApiRef = useRef<ChartApiImpl | null>(null);

	// Function to force a component update
	const triggerUpdate = useCallback(() => {
		setForceUpdate((prev) => prev + 1);
	}, []);

	// Create chart API instance if it doesn't exist
	if (!chartApiRef.current) {
		chartApiRef.current = new ChartApiImpl(
			width,
			height,
			options,
			triggerUpdate
		);
	}

	// Handle canvas context initialization
	const handleCanvasReady = useCallback(
		(context: SkiaCanvasRenderingContext) => {
			if (chartApiRef.current) {
				chartApiRef.current.setContext(context);
			}
		},
		[]
	);

	// Handle touch events for crosshair, etc.
	const handleTouch = useCallback(
		(x: number, y: number, type: "start" | "move" | "end") => {
			// Implement touch handling
		},
		[]
	);

	// Handle resizing
	useEffect(() => {
		if (chartApiRef.current) {
			chartApiRef.current.resize(width, height);
		}
	}, [width, height]);

	// Update options if they change
	useEffect(() => {
		if (chartApiRef.current) {
			chartApiRef.current.applyOptions(options);
		}
	}, [options]);

	return (
		<View style={[styles.container, { width, height }]}>
			<SkiaCanvas
				width={width}
				height={height}
				onReady={handleCanvasReady}
				onTouch={handleTouch}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		overflow: "hidden",
	},
});

// Factory function similar to the original library
export const createChart = (
	container: any,
	options?: Partial<ChartOptions>
): IChartApi => {
	// In React Native, we don't need the container parameter, but we keep it for API compatibility
	const containerWidth = options?.width || 400;
	const containerHeight = options?.height || 300;

	// Create a new chart instance
	const chartApi = new ChartApiImpl(
		containerWidth,
		containerHeight,
		options || {},
		() => {
			/* No-op in this context */
		}
	);

	return chartApi;
};

export default Chart;
