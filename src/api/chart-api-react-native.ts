import { DeepPartial } from '../helpers/strict-type-checks';
import { ChartModel } from '../model/chart-model';
import { HorzScaleBehaviorTime } from '../model/horz-scale-behavior-time/horz-scale-behavior-time';
import { Time } from '../model/horz-scale-behavior-time/types';
import { TimeChartOptions } from '../model/horz-scale-behavior-time/time-based-chart-options';
import { Series } from '../model/series';
import { SeriesOptionsMap } from '../model/series-options';
import { ChartOptionsInternal, HandleScrollOptions } from '../model/chart-model';
import {
	RNCanvas as InternalRNCanvas,
	RNCanvasRenderingContext2D,
} from '../renderers/react-native-canvas-renderer';

// Re-export these interfaces for external use
export type RNCanvas = InternalRNCanvas;
export type { RNCanvasRenderingContext2D };

/**
 * Structure describing options of the chart with time points at the horizontal scale for React Native
 */
export type ChartOptions = TimeChartOptions;

/**
 * Main interface for the Chart API in React Native
 */
export interface IChartApi {
	/**
	 * Resizes the chart to the provided dimensions
	 */
	resize(width: number, height: number, forceRepaint?: boolean): void;

	/**
	 * Applies new options to the chart
	 */
	applyOptions(options: DeepPartial<ChartOptions>): void;

	/**
	 * Adds a new series to the chart
	 */
	addSeries<TSeriesType extends keyof SeriesOptionsMap>(
		seriesType: TSeriesType,
		options?: DeepPartial<SeriesOptionsMap[TSeriesType]>
	): Series<TSeriesType>;

	/**
	 * Removes a series from the chart
	 */
	removeSeries(series: Series<keyof SeriesOptionsMap>): void;

	/**
	 * Subscribe to chart click events
	 */
	subscribeClick(handler: (param: MouseEventParams) => void): void;

	/**
	 * Unsubscribe from chart click events
	 */
	unsubscribeClick(handler: (param: MouseEventParams) => void): void;

	/**
	 * Subscribe to crosshair move events
	 */
	subscribeCrosshairMove(handler: (param: MouseEventParams) => void): void;

	/**
	 * Unsubscribe from crosshair move events
	 */
	unsubscribeCrosshairMove(handler: (param: MouseEventParams) => void): void;

	/**
	 * Returns the current visible time range
	 */
	timeScale(): TimeScaleApi;
}

/**
 * Mouse event parameters type
 */
export interface MouseEventParams {
	time?: number;
	point?: { x: number; y: number };
	seriesData: Map<Series<keyof SeriesOptionsMap>, unknown>;
}

/**
 * Time scale API interface
 */
export interface TimeScaleApi {
	scrollPosition(): number;
	scrollToPosition(position: number, animated: boolean): void;
	getVisibleRange(): { from: number; to: number } | null;
	setVisibleRange(range: { from: number; to: number }): void;
	getVisibleLogicalRange(): { from: number; to: number } | null;
	setVisibleLogicalRange(range: { from: number; to: number }): void;
}

/**
 * Canvas wrapper class for React Native
 */
class ReactNativeCanvasWrapper {
	private readonly _canvas: RNCanvas;
	private readonly _context: RNCanvasRenderingContext2D;
	private readonly _width: number;
	private readonly _height: number;

	public constructor(canvas: RNCanvas) {
		this._canvas = canvas;
		this._width = canvas.width;
		this._height = canvas.height;
		this._context = canvas.getContext('2d');
	}

	public getContext(): RNCanvasRenderingContext2D {
		return this._context;
	}

	public getSize(): { width: number; height: number } {
		return {
			width: this._width,
			height: this._height,
		};
	}
}

/**
 * Chart API implementation for React Native
 */
export class ChartApiReactNative implements IChartApi {
	private _canvasWrapper: ReactNativeCanvasWrapper;
	private _model: ChartModel<Time>;
	private _options: ChartOptions;

	public constructor(canvas: RNCanvas, options: DeepPartial<ChartOptions>) {
		this._canvasWrapper = new ReactNativeCanvasWrapper(canvas);

		// Initialize with default behavior for time series
		const horzScaleBehavior = new HorzScaleBehaviorTime();

		// Create chart model with default options
		const chartOptions = { ...options } as ChartOptions;
		// Ensure handleScroll is a proper HandleScrollOptions object if it's a boolean
		if (typeof chartOptions.handleScroll === 'boolean') {
			chartOptions.handleScroll = { 
				mouseWheel: chartOptions.handleScroll,
				pressedMouseMove: chartOptions.handleScroll,
				horzTouchDrag: chartOptions.handleScroll,
				vertTouchDrag: chartOptions.handleScroll
			};
		}
		this._options = chartOptions;
		this._model = new ChartModel(
			this._invalidateHandler.bind(this),
			chartOptions as ChartOptionsInternal<Time>,
			horzScaleBehavior
		);

		// Apply options to time scale
		horzScaleBehavior.setOptions(this._options);

		// Initialize chart with canvas dimensions
		const size = this._canvasWrapper.getSize();
		this.resize(size.width, size.height);
	}

	public resize(
		width: number,
		height: number,
		forceRepaint: boolean = false
	): void {
		// Implement resize logic using the model
		if (forceRepaint) {
			// Force repaint logic
		}
	}

	public applyOptions(options: DeepPartial<ChartOptions>): void {
		// Convert boolean handleScroll to proper HandleScrollOptions if needed
		const modifiedOptions = { ...options };
		if (typeof modifiedOptions.handleScroll === 'boolean') {
			modifiedOptions.handleScroll = {
				mouseWheel: modifiedOptions.handleScroll,
				pressedMouseMove: modifiedOptions.handleScroll,
				horzTouchDrag: modifiedOptions.handleScroll,
				vertTouchDrag: modifiedOptions.handleScroll
			};
		}
		// Apply new options to the model
		this._model.applyOptions(modifiedOptions as DeepPartial<ChartOptionsInternal<Time>>);
	}

	public addSeries<TSeriesType extends keyof SeriesOptionsMap>(
		seriesType: TSeriesType,
		options?: DeepPartial<SeriesOptionsMap[TSeriesType]>
	): Series<TSeriesType> {
		// This is a placeholder implementation - the actual implementation
		// would depend on how the model creates series
		return {} as Series<TSeriesType>;
	}

	public removeSeries(series: Series<keyof SeriesOptionsMap>): void {
		// Remove series from the chart
		this._model.removeSeries(series);
	}

	public subscribeClick(handler: (param: MouseEventParams) => void): void {
		// Subscribe to click events
	}

	public unsubscribeClick(handler: (param: MouseEventParams) => void): void {
		// Unsubscribe from click events
	}

	public subscribeCrosshairMove(
		handler: (param: MouseEventParams) => void
	): void {
		// Subscribe to crosshair move events
	}

	public unsubscribeCrosshairMove(
		handler: (param: MouseEventParams) => void
	): void {
		// Unsubscribe from crosshair move events
	}

	public timeScale(): TimeScaleApi {
		// Return time scale API
		return {
			scrollPosition: () => 0,
			scrollToPosition: () => {},
			getVisibleRange: () => null,
			setVisibleRange: () => {},
			getVisibleLogicalRange: () => null,
			setVisibleLogicalRange: () => {},
		};
	}

	private _invalidateHandler(): void {
		// Handle invalidation and redraw
		this._drawImpl();
	}

	private _drawImpl(): void {
		// Implement drawing logic using the model
		const ctx = this._canvasWrapper.getContext();
		// Clear canvas
		const size = this._canvasWrapper.getSize();
		ctx.clearRect(0, 0, size.width, size.height);

		// Draw chart components
		// ...
	}
}

/**
 * Creates a chart using a React Native Canvas
 *
 * @param canvas - React Native Canvas element
 * @param options - Chart options
 * @returns Chart API interface
 */
export function createChart(
	canvas: RNCanvas,
	options?: DeepPartial<ChartOptions>
): IChartApi {
	return new ChartApiReactNative(canvas, options || {});
}
