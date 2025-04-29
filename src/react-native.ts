/**
 * React Native specific exports for lightweight-charts
 */
/* tslint:disable:ordered-imports */
// api
import { ChartApi } from './api/chart-api';
import { ChartOptions, createChart, IChartApi } from './api/chart-api-react-native';

// components/gui
import { Chart } from './components/Chart';

// helpers
import { DeepPartial } from './helpers/strict-type-checks';

// model
import { CrosshairMode } from './model/crosshair';
import { ColorType } from './model/layout-options';
import { HorzScaleBehaviorTime } from './model/horz-scale-behavior-time/horz-scale-behavior-time';
import { Time, TickMarkType, isBusinessDay, isUTCTimestamp } from './model/horz-scale-behavior-time/types';
import { TimeChartOptions } from './model/horz-scale-behavior-time/time-based-chart-options';
import { PriceScaleMode } from './model/price-scale';
import { LastPriceAnimationMode, PriceLineSource } from './model/series-options';
import { areaSeries as AreaSeries } from './model/series/area-series';
import { barSeries as BarSeries } from './model/series/bar-series';
import { baselineSeries as BaselineSeries } from './model/series/baseline-series';
import { candlestickSeries as CandlestickSeries } from './model/series/candlestick-series';
import { histogramSeries as HistogramSeries } from './model/series/histogram-series';
import { lineSeries as LineSeries } from './model/series/line-series';

// renderers
import { LineStyle, LineType } from './renderers/draw-line';

// current directory
import { createChart as reactNativeInitCreateChart } from './react-native-init';

// Re-export types from the original library
export { LineStyle, LineType } from './renderers/draw-line';
export { CrosshairMode } from './model/crosshair';
export { PriceScaleMode } from './model/price-scale';
export {
	LastPriceAnimationMode,
	PriceLineSource,
} from './model/series-options';
export { ColorType } from './model/layout-options';
export { TickMarkType } from './model/horz-scale-behavior-time/types';
export {
	isBusinessDay,
	isUTCTimestamp,
} from './model/horz-scale-behavior-time/types';

// Export React Native specific components and APIs
export { Chart };
export { ChartOptions, IChartApi, createChart };

// Export series types
export { AreaSeries };
export { BarSeries };
export { BaselineSeries };
export { CandlestickSeries };
export { HistogramSeries };
export { LineSeries };

/**
 * Returns the current version as a string.
 */
export function version(): string {
	return process.env.BUILD_VERSION || '5.0.6';
}

/**
 * This function is the main entry point of the Lightweight Charting Library
 * 
 * @param container - id or a reference to a DOM container
 * @param options - any subset of options to be applied at this point
 * @returns an interface to the created chart
 */
export function createTimeChart(
	canvas: unknown,
	options?: DeepPartial<TimeChartOptions>
): ChartApi<Time> {
	return reactNativeInitCreateChart(
		canvas,
		options || {},
		new HorzScaleBehaviorTime()
	) as ChartApi<Time>;
}
