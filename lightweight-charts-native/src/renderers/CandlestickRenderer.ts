import { SkiaCanvasRenderingContext } from "../canvas/SkiaCanvas";
import { BarData, CandlestickSeriesOptions } from "../types";
import { timeToCoordinate, valueToCoordinate } from "../helpers/utils";

interface VisibleRange {
	from: number | string;
	to: number | string;
}

interface PriceRange {
	min: number;
	max: number;
}

/**
 * Renders a candlestick series on the chart
 * @param ctx - The canvas rendering context
 * @param data - The bar data to render
 * @param options - The candlestick series options
 * @param width - The chart width
 * @param height - The chart height
 * @param visibleRange - The visible time range
 * @param priceRange - The visible price range
 * @param barWidth - The width of each candlestick, usually derived from barSpacing
 */
export function renderCandlesticks(
	ctx: SkiaCanvasRenderingContext,
	data: BarData[],
	options: CandlestickSeriesOptions,
	width: number,
	height: number,
	visibleRange: VisibleRange,
	priceRange: PriceRange,
	barWidth: number = 6
): void {
	if (!data.length) return;

	// Sort data by time
	const sortedData = [...data].sort((a, b) => {
		const timeA =
			typeof a.time === "string" ? new Date(a.time).getTime() : Number(a.time);
		const timeB =
			typeof b.time === "string" ? new Date(b.time).getTime() : Number(b.time);
		return timeA - timeB;
	});

	// Default options
	const upColor = options.upColor || "#26a69a";
	const downColor = options.downColor || "#ef5350";
	const borderVisible =
		options.borderVisible !== undefined ? options.borderVisible : true;
	const wickVisible =
		options.wickVisible !== undefined ? options.wickVisible : true;
	const borderUpColor = options.borderUpColor || upColor;
	const borderDownColor = options.borderDownColor || downColor;
	const wickUpColor = options.wickUpColor || upColor;
	const wickDownColor = options.wickDownColor || downColor;

	// Calculate half bar width
	const halfBarWidth = Math.max(1, Math.floor(barWidth / 2));

	// Draw each candlestick
	for (const bar of sortedData) {
		const open = bar.open;
		const close = bar.close;
		const high = bar.high;
		const low = bar.low;

		// Check if this is an up or down bar
		const isUp = close >= open;

		// Calculate x-coordinate (center of the bar)
		const x = timeToCoordinate(bar.time, visibleRange, width);

		// Calculate y-coordinates for price values
		const openY = valueToCoordinate(open, priceRange, height);
		const closeY = valueToCoordinate(close, priceRange, height);
		const highY = valueToCoordinate(high, priceRange, height);
		const lowY = valueToCoordinate(low, priceRange, height);

		// Set colors based on up/down status
		const fillColor = isUp ? upColor : downColor;
		const borderColor = isUp ? borderUpColor : borderDownColor;
		const wickColor = isUp ? wickUpColor : wickDownColor;

		// Draw candle body
		const bodyTop = Math.min(openY, closeY);
		const bodyBottom = Math.max(openY, closeY);
		const bodyHeight = Math.max(1, bodyBottom - bodyTop); // Ensure at least 1px height

		// Draw wick
		if (wickVisible) {
			ctx.strokeStyle = wickColor;
			ctx.lineWidth = 1;
			ctx.beginPath();
			// Top wick
			ctx.moveTo(x, highY);
			ctx.lineTo(x, bodyTop);
			// Bottom wick
			ctx.moveTo(x, bodyBottom);
			ctx.lineTo(x, lowY);
			ctx.stroke();
		}

		// Draw body rectangle
		ctx.fillStyle = fillColor;
		const bodyLeft = x - halfBarWidth;
		const bodyWidth = halfBarWidth * 2;

		if (borderVisible) {
			ctx.strokeStyle = borderColor;
			ctx.lineWidth = 1;
			ctx.strokeRect(bodyLeft, bodyTop, bodyWidth, bodyHeight);
		}

		ctx.fillRect(bodyLeft, bodyTop, bodyWidth, bodyHeight);
	}
}
