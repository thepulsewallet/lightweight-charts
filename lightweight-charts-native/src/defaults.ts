import { ChartOptions, ColorType, CrosshairMode, LineStyle } from "./types";

export const defaultChartOptions: ChartOptions = {
	width: 400,
	height: 300,
	layout: {
		background: {
			color: "#ffffff",
			type: ColorType.Solid,
		},
		textColor: "#191919",
		fontSize: 12,
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
	},
	grid: {
		vertLines: {
			color: "#D6DCDE",
			style: LineStyle.Solid,
			visible: true,
		},
		horzLines: {
			color: "#D6DCDE",
			style: LineStyle.Solid,
			visible: true,
		},
	},
	crosshair: {
		mode: CrosshairMode.Normal,
		vertLine: {
			color: "#758696",
			width: 1,
			style: LineStyle.Solid,
			visible: true,
			labelVisible: true,
		},
		horzLine: {
			color: "#758696",
			width: 1,
			style: LineStyle.Solid,
			visible: true,
			labelVisible: true,
		},
	},
	timeScale: {
		rightOffset: 0,
		barSpacing: 6,
		fixLeftEdge: false,
		lockVisibleTimeRangeOnResize: false,
		rightBarStaysOnScroll: false,
		borderVisible: true,
		borderColor: "#D6DCDE",
		visible: true,
		timeVisible: true,
		secondsVisible: true,
	},
};
