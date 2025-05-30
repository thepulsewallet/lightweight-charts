import React, { useRef, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
	Canvas,
	CanvasProps,
	useCanvasRef,
	SkiaValue,
	useValue,
	runTiming,
	Skia,
	Group,
	useComputedValue,
	useTouchHandler,
	vec,
} from "@shopify/react-native-skia";

type SkiaCanvasProps = {
	width: number;
	height: number;
	onReady?: (context: SkiaCanvasRenderingContext) => void;
	onTouch?: (x: number, y: number, type: "start" | "move" | "end") => void;
};

/**
 * A class that mimics the CanvasRenderingContext2D API from the browser
 * but uses Skia under the hood
 */
export class SkiaCanvasRenderingContext {
	private canvas: Canvas | null = null;
	private _skiaCanvas: SkiaValue<number>;
	private _width: number;
	private _height: number;
	private _lineWidth: number = 1;
	private _strokeStyle: string = "black";
	private _fillStyle: string = "black";
	private _font: string = "12px sans-serif";
	private _textAlign: "left" | "center" | "right" = "left";
	private _textBaseline: "top" | "middle" | "bottom" = "top";
	private _lineDash: number[] = [];
	private _path: SkiaPath | null = null;

	constructor(width: number, height: number, skiaCanvas: SkiaValue<number>) {
		this._width = width;
		this._height = height;
		this._skiaCanvas = skiaCanvas;
	}

	setCanvas(canvas: Canvas | null) {
		this.canvas = canvas;
	}

	// Line style properties
	set lineWidth(width: number) {
		this._lineWidth = width;
	}

	get lineWidth(): number {
		return this._lineWidth;
	}

	set strokeStyle(style: string) {
		this._strokeStyle = style;
	}

	get strokeStyle(): string {
		return this._strokeStyle;
	}

	set fillStyle(style: string) {
		this._fillStyle = style;
	}

	get fillStyle(): string {
		return this._fillStyle;
	}

	set font(font: string) {
		this._font = font;
	}

	get font(): string {
		return this._font;
	}

	set textAlign(align: "left" | "center" | "right") {
		this._textAlign = align;
	}

	get textAlign(): "left" | "center" | "right" {
		return this._textAlign;
	}

	set textBaseline(baseline: "top" | "middle" | "bottom") {
		this._textBaseline = baseline;
	}

	get textBaseline(): "top" | "middle" | "bottom" {
		return this._textBaseline;
	}

	set lineDash(dash: number[]) {
		this._lineDash = dash;
	}

	get lineDash(): number[] {
		return this._lineDash;
	}

	// Drawing methods
	clearRect(x: number, y: number, width: number, height: number): void {
		// Implementation would use Skia's clear methods
	}

	fillRect(x: number, y: number, width: number, height: number): void {
		// Implementation would create a Skia rect and fill it
	}

	strokeRect(x: number, y: number, width: number, height: number): void {
		// Implementation would create a Skia rect and stroke it
	}

	beginPath(): void {
		// Create a new Skia path
		this._path = Skia.Path.Make();
	}

	closePath(): void {
		// Close the current path
		this._path?.close();
	}

	moveTo(x: number, y: number): void {
		// Move to position in path
		this._path?.moveTo(x, y);
	}

	lineTo(x: number, y: number): void {
		// Add line to path
		this._path?.lineTo(x, y);
	}

	arc(
		x: number,
		y: number,
		radius: number,
		startAngle: number,
		endAngle: number,
		counterclockwise?: boolean
	): void {
		// Add arc to path
	}

	stroke(): void {
		// Stroke the current path
	}

	fill(): void {
		// Fill the current path
	}

	fillText(text: string, x: number, y: number, maxWidth?: number): void {
		// Draw text with Skia
	}

	measureText(text: string): { width: number } {
		// Measure text using Skia's text measurement
		return { width: 0 }; // Placeholder
	}

	// Save and restore drawing state
	save(): void {
		// Save the current drawing state
	}

	restore(): void {
		// Restore the drawing state
	}

	// Transformation methods
	translate(x: number, y: number): void {
		// Apply translation transform
	}

	scale(x: number, y: number): void {
		// Apply scale transform
	}

	rotate(angle: number): void {
		// Apply rotation transform
	}

	// Additional methods as needed for chart rendering
}

type SkiaPath = ReturnType<typeof Skia.Path.Make>;

/**
 * A React component that provides a canvas for drawing charts
 */
const SkiaCanvas: React.FC<SkiaCanvasProps> = ({
	width,
	height,
	onReady,
	onTouch,
}) => {
	const canvasRef = useCanvasRef();
	const skCanvas = useValue(0);
	const [context] = useState(
		() => new SkiaCanvasRenderingContext(width, height, skCanvas)
	);

	// Set up touch handler
	const touchHandler = useTouchHandler({
		onStart: ({ x, y }) => {
			onTouch?.(x, y, "start");
		},
		onActive: ({ x, y }) => {
			onTouch?.(x, y, "move");
		},
		onEnd: ({ x, y }) => {
			onTouch?.(x, y, "end");
		},
	});

	useEffect(() => {
		if (canvasRef.current) {
			context.setCanvas(canvasRef.current);
			onReady?.(context);
		}
	}, [canvasRef, context, onReady]);

	return (
		<Canvas ref={canvasRef} style={{ width, height }} onTouch={touchHandler} />
	);
};

export default SkiaCanvas;
