// Export Chart component
export { default as Chart } from "./components/Chart";
export { createChart } from "./components/Chart";

// Export types
export {
	Time,
	LineStyle,
	LineType,
	CrosshairMode,
	PriceScaleMode,
	PriceLineSource,
	LastPriceAnimationMode,
	ColorType,
	BarData,
	LineData,
	HistogramData,
	WhitespaceData,
	ChartOptions,
	SeriesOptions,
	LineSeriesOptions,
	AreaSeriesOptions,
	BarSeriesOptions,
	CandlestickSeriesOptions,
	HistogramSeriesOptions,
	SeriesType,
} from "./types";

// Export series constructors
export const LineSeries = "Line";
export const AreaSeries = "Area";
export const BarSeries = "Bar";
export const CandlestickSeries = "Candlestick";
export const HistogramSeries = "Histogram";

/**
 * Returns the current version as a string.
 */
export function version(): string {
	return "0.1.0"; // Initial version
}
