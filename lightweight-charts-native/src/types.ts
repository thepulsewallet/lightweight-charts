export type Time = number | string;

export enum LineStyle {
	Solid = 0,
	Dotted = 1,
	Dashed = 2,
	LargeDashed = 3,
	SparseDotted = 4,
}

export enum LineType {
	Simple = 0,
	WithSteps = 1,
}

export enum CrosshairMode {
	Normal = 0,
	Magnet = 1,
	NoCrosshair = 2,
}

export enum PriceScaleMode {
	Normal = 0,
	Logarithmic = 1,
	Percentage = 2,
	IndexedTo100 = 3,
}

export enum PriceLineSource {
	LastBar = 0,
	LastVisible = 1,
}

export enum LastPriceAnimationMode {
	Disabled = 0,
	Continuous = 1,
	OnDataUpdate = 2,
}

export enum ColorType {
	Solid = 0,
	VerticalGradient = 1,
}

export interface BarData {
	time: Time;
	open: number;
	high: number;
	low: number;
	close: number;
}

export interface LineData {
	time: Time;
	value: number;
}

export interface HistogramData {
	time: Time;
	value: number;
	color?: string;
}

export interface WhitespaceData {
	time: Time;
}

export type ChartOptions = {
	width: number;
	height: number;
	layout?: {
		background?: {
			color?: string;
			type?: ColorType;
		};
		textColor?: string;
		fontSize?: number;
		fontFamily?: string;
	};
	grid?: {
		vertLines?: {
			color?: string;
			style?: LineStyle;
			visible?: boolean;
		};
		horzLines?: {
			color?: string;
			style?: LineStyle;
			visible?: boolean;
		};
	};
	crosshair?: {
		mode?: CrosshairMode;
		vertLine?: {
			color?: string;
			width?: number;
			style?: LineStyle;
			visible?: boolean;
			labelVisible?: boolean;
		};
		horzLine?: {
			color?: string;
			width?: number;
			style?: LineStyle;
			visible?: boolean;
			labelVisible?: boolean;
		};
	};
	timeScale?: {
		rightOffset?: number;
		barSpacing?: number;
		fixLeftEdge?: boolean;
		lockVisibleTimeRangeOnResize?: boolean;
		rightBarStaysOnScroll?: boolean;
		borderVisible?: boolean;
		borderColor?: string;
		visible?: boolean;
		timeVisible?: boolean;
		secondsVisible?: boolean;
	};
};

export type SeriesOptions = {
	title?: string;
	visible?: boolean;
	lastValueVisible?: boolean;
	priceLineVisible?: boolean;
	priceLineSource?: PriceLineSource;
	priceLineWidth?: number;
	priceLineColor?: string;
	priceLineStyle?: LineStyle;
	priceFormat?: {
		type?: "price" | "volume" | "percent";
		precision?: number;
		minMove?: number;
	};
};

export type LineSeriesOptions = SeriesOptions & {
	color?: string;
	lineWidth?: number;
	lineStyle?: LineStyle;
	lineType?: LineType;
	crosshairMarkerVisible?: boolean;
	crosshairMarkerRadius?: number;
};

export type AreaSeriesOptions = SeriesOptions & {
	topColor?: string;
	bottomColor?: string;
	lineColor?: string;
	lineWidth?: number;
	lineStyle?: LineStyle;
	lineType?: LineType;
	crosshairMarkerVisible?: boolean;
	crosshairMarkerRadius?: number;
};

export type BarSeriesOptions = SeriesOptions & {
	upColor?: string;
	downColor?: string;
	thinBars?: boolean;
};

export type CandlestickSeriesOptions = SeriesOptions & {
	upColor?: string;
	downColor?: string;
	borderVisible?: boolean;
	borderColor?: string;
	borderUpColor?: string;
	borderDownColor?: string;
	wickVisible?: boolean;
	wickColor?: string;
	wickUpColor?: string;
	wickDownColor?: string;
};

export type HistogramSeriesOptions = SeriesOptions & {
	color?: string;
	base?: number;
};

export type SeriesType = "Line" | "Area" | "Bar" | "Candlestick" | "Histogram";

export type SeriesOptionsMap = {
	Line: LineSeriesOptions;
	Area: AreaSeriesOptions;
	Bar: BarSeriesOptions;
	Candlestick: CandlestickSeriesOptions;
	Histogram: HistogramSeriesOptions;
};

export type SeriesDataItemTypeMap = {
	Line: LineData;
	Area: LineData;
	Bar: BarData;
	Candlestick: BarData;
	Histogram: HistogramData;
};
