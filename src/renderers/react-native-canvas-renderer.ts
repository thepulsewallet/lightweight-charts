import { IPaneRenderer } from "./ipane-renderer";
import { Size } from "fancy-canvas";
import { Coordinate } from "../model/coordinate";

// Interface to represent React Native Canvas context which matches CanvasRenderingContext2D API
export interface RNCanvasRenderingContext2D {
	// Common Canvas properties
	fillStyle: string;
	font: string;
	globalAlpha: number;
	lineCap: string;
	lineDashOffset: number;
	lineJoin: string;
	lineWidth: number;
	miterLimit: number;
	shadowBlur: number;
	shadowColor: string;
	shadowOffsetX: number;
	shadowOffsetY: number;
	strokeStyle: string;
	textAlign: string;
	textBaseline: string;

	// Canvas methods
	arc(
		x: number,
		y: number,
		radius: number,
		startAngle: number,
		endAngle: number,
		anticlockwise?: boolean
	): void;
	beginPath(): void;
	bezierCurveTo(
		cp1x: number,
		cp1y: number,
		cp2x: number,
		cp2y: number,
		x: number,
		y: number
	): void;
	clearRect(x: number, y: number, width: number, height: number): void;
	clip(path?: any, fillRule?: string): void;
	closePath(): void;
	createLinearGradient(x0: number, y0: number, x1: number, y1: number): any;
	drawImage(
		image: any,
		dx: number,
		dy: number,
		dWidth?: number,
		dHeight?: number,
		sx?: number,
		sy?: number,
		sWidth?: number,
		sHeight?: number
	): void;
	fill(path?: any, fillRule?: string): void;
	fillRect(x: number, y: number, width: number, height: number): void;
	fillText(text: string, x: number, y: number, maxWidth?: number): void;
	getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
	getLineDash(): number[];
	lineTo(x: number, y: number): void;
	measureText(text: string): TextMetrics;
	moveTo(x: number, y: number): void;
	putImageData(
		imagedata: ImageData,
		dx: number,
		dy: number,
		dirtyX?: number,
		dirtyY?: number,
		dirtyWidth?: number,
		dirtyHeight?: number
	): void;
	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
	rect(x: number, y: number, w: number, h: number): void;
	restore(): void;
	rotate(angle: number): void;
	save(): void;
	scale(x: number, y: number): void;
	setLineDash(segments: number[]): void;
	setTransform(
		a: number,
		b: number,
		c: number,
		d: number,
		e: number,
		f: number
	): void;
	stroke(path?: any): void;
	strokeRect(x: number, y: number, w: number, h: number): void;
	strokeText(text: string, x: number, y: number, maxWidth?: number): void;
	transform(
		a: number,
		b: number,
		c: number,
		d: number,
		e: number,
		f: number
	): void;
	translate(x: number, y: number): void;
}

// Interface for React Native Canvas
export interface RNCanvas {
	width: number;
	height: number;
	getContext(contextId: "2d"): RNCanvasRenderingContext2D;
}

/**
 * Base renderer implementation for React Native's canvas context
 */
export abstract class ReactNativeCanvasRenderer {
	protected _context: RNCanvasRenderingContext2D | null = null;

	public setContext(context: RNCanvasRenderingContext2D | null): void {
		this._context = context;
	}

	// Abstract methods that derived classes must implement
	public abstract drawOnReactNative(
		renderingTarget: RNCanvasRenderingContext2D,
		pixelRatio: number
	): void;

	public drawBackgroundOnReactNative?(
		renderingTarget: RNCanvasRenderingContext2D,
		pixelRatio: number
	): void;

	public abstract getCanvasSize(): Size;
}

/**
 * Helper methods to adapt standard canvas operations for React Native
 */
export const rnCanvasHelpers = {
	// Set line style on React Native canvas context
	setLineStyle(ctx: RNCanvasRenderingContext2D, style: number): void {
		const dashPatterns: Record<number, number[]> = {
			0: [], // Solid
			1: [ctx.lineWidth, ctx.lineWidth], // Dotted
			2: [2 * ctx.lineWidth, 2 * ctx.lineWidth], // Dashed
			3: [6 * ctx.lineWidth, 6 * ctx.lineWidth], // LargeDashed
			4: [ctx.lineWidth, 4 * ctx.lineWidth], // SparseDotted
		};

		const dashPattern = dashPatterns[style] || [];
		ctx.setLineDash(dashPattern);
	},

	// Draw horizontal line adapting to React Native canvas
	drawHorizontalLine(
		ctx: RNCanvasRenderingContext2D,
		y: number,
		left: number,
		right: number
	): void {
		ctx.beginPath();
		const correction = ctx.lineWidth % 2 ? 0.5 : 0;
		ctx.moveTo(left, y + correction);
		ctx.lineTo(right, y + correction);
		ctx.stroke();
	},

	// Draw vertical line adapting to React Native canvas
	drawVerticalLine(
		ctx: RNCanvasRenderingContext2D,
		x: number,
		top: number,
		bottom: number
	): void {
		ctx.beginPath();
		const correction = ctx.lineWidth % 2 ? 0.5 : 0;
		ctx.moveTo(x + correction, top);
		ctx.lineTo(x + correction, bottom);
		ctx.stroke();
	},

	// Stroke operation with pixel-perfect correction for React Native
	strokeInPixel(
		ctx: RNCanvasRenderingContext2D,
		drawFunction: () => void
	): void {
		ctx.save();
		if (ctx.lineWidth % 2) {
			ctx.translate(0.5, 0.5);
		}
		drawFunction();
		ctx.restore();
	},
};
