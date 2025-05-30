import { SkiaCanvasRenderingContext } from "../canvas/SkiaCanvas";
import { LineData, LineSeriesOptions, LineStyle, LineType } from "../types";
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
 * Renders a line series on the chart
 * @param ctx - The canvas rendering context
 * @param data - The line data to render
 * @param options - The line series options
 * @param width - The chart width
 * @param height - The chart height
 * @param visibleRange - The visible time range
 * @param priceRange - The visible price range
 */
export function renderLine(
	ctx: SkiaCanvasRenderingContext,
	data: LineData[],
	options: LineSeriesOptions,
	width: number,
	height: number,
	visibleRange: VisibleRange,
	priceRange: PriceRange
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

	// Set line style
	ctx.lineWidth = options.lineWidth || 2;
	ctx.strokeStyle = options.color || "rgba(56, 121, 217, 1)";
	setLineStyle(ctx, options.lineStyle || LineStyle.Solid);

	// Begin path
	ctx.beginPath();

	// Draw line based on line type
	if (options.lineType === LineType.WithSteps) {
		drawStepLine(ctx, sortedData, width, height, visibleRange, priceRange);
	} else {
		drawSimpleLine(ctx, sortedData, width, height, visibleRange, priceRange);
	}

	// Stroke the path
	ctx.stroke();

	// Draw markers if enabled
	if (options.crosshairMarkerVisible) {
		drawMarkers(
			ctx,
			sortedData,
			options,
			width,
			height,
			visibleRange,
			priceRange
		);
	}
}

/**
 * Sets the line style on the context
 */
function setLineStyle(ctx: SkiaCanvasRenderingContext, style: LineStyle): void {
	switch (style) {
		case LineStyle.Solid:
			ctx.lineDash = [];
			break;
		case LineStyle.Dotted:
			ctx.lineDash = [1, 4];
			break;
		case LineStyle.Dashed:
			ctx.lineDash = [6, 6];
			break;
		case LineStyle.LargeDashed:
			ctx.lineDash = [12, 6];
			break;
		case LineStyle.SparseDotted:
			ctx.lineDash = [1, 8];
			break;
	}
}

/**
 * Draws a simple continuous line
 */
function drawSimpleLine(
	ctx: SkiaCanvasRenderingContext,
	data: LineData[],
	width: number,
	height: number,
	visibleRange: VisibleRange,
	priceRange: PriceRange
): void {
	const first = data[0];
	const x = timeToCoordinate(first.time, visibleRange, width);
	const y = valueToCoordinate(first.value, priceRange, height);

	ctx.moveTo(x, y);

	for (let i = 1; i < data.length; i++) {
		const point = data[i];
		const x = timeToCoordinate(point.time, visibleRange, width);
		const y = valueToCoordinate(point.value, priceRange, height);
		ctx.lineTo(x, y);
	}
}

/**
 * Draws a step line (horizontal and vertical segments)
 */
function drawStepLine(
	ctx: SkiaCanvasRenderingContext,
	data: LineData[],
	width: number,
	height: number,
	visibleRange: VisibleRange,
	priceRange: PriceRange
): void {
	const first = data[0];
	let prevX = timeToCoordinate(first.time, visibleRange, width);
	let prevY = valueToCoordinate(first.value, priceRange, height);

	ctx.moveTo(prevX, prevY);

	for (let i = 1; i < data.length; i++) {
		const point = data[i];
		const x = timeToCoordinate(point.time, visibleRange, width);
		const y = valueToCoordinate(point.value, priceRange, height);

		// Draw horizontal line to the new x position
		ctx.lineTo(x, prevY);

		// Draw vertical line to the new y position
		ctx.lineTo(x, y);

		prevX = x;
		prevY = y;
	}
}

/**
 * Draws markers at each data point
 */
function drawMarkers(
	ctx: SkiaCanvasRenderingContext,
	data: LineData[],
	options: LineSeriesOptions,
	width: number,
	height: number,
	visibleRange: VisibleRange,
	priceRange: PriceRange
): void {
	const radius = options.crosshairMarkerRadius || 4;

	// Save current style
	const currentStrokeStyle = ctx.strokeStyle;
	const currentFillStyle = ctx.fillStyle;
	const currentLineWidth = ctx.lineWidth;

	// Set marker style
	ctx.fillStyle = options.color || "rgba(56, 121, 217, 1)";
	ctx.strokeStyle = "white";
	ctx.lineWidth = 2;

	for (const point of data) {
		const x = timeToCoordinate(point.time, visibleRange, width);
		const y = valueToCoordinate(point.value, priceRange, height);

		// Draw the marker
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	}

	// Restore original style
	ctx.strokeStyle = currentStrokeStyle;
	ctx.fillStyle = currentFillStyle;
	ctx.lineWidth = currentLineWidth;
}
