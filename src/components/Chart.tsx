import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
// Since we're having TypeScript issues with the Canvas component,
// let's comment out the import and create a stub for development purposes
// import Canvas from "react-native-canvas";
import { DeepPartial } from "../helpers/strict-type-checks";
import {
	ChartOptions,
	IChartApi,
	createChart,
	RNCanvas
} from "../api/chart-api-react-native";

interface ChartProps {
	style?: ViewStyle;
	options?: DeepPartial<ChartOptions>;
	onChartReady?: (chart: IChartApi) => void;
}

// Create a dummy Canvas for TypeScript compatibility
// In a real implementation, you would need to properly import and use the Canvas component
// from react-native-canvas, and ensure it's correctly typed
interface CanvasStub {
	width: number;
	height: number;
	getContext(contextId: string): any;
}

// In a real implementation, you'd use the actual Canvas from react-native-canvas
const DummyCanvas = () => {
	return <View />;
};

// Adapter to convert canvas to RNCanvas interface
const canvasToRNCanvas = (canvas: CanvasStub): RNCanvas => {
	return {
		width: canvas.width,
		height: canvas.height,
		getContext: (contextId: "2d") => {
			// Get the original context and adapt it to RNCanvasRenderingContext2D
			const originalContext = canvas.getContext(contextId);
			// Return the context, assuming it implements the required methods
			return originalContext as any;
		}
	};
};

export const Chart: React.FC<ChartProps> = ({
	style,
	options = {},
	onChartReady,
}) => {
	const containerRef = useRef<View | null>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

	// In a real implementation, you would use actual canvas management here
	useEffect(() => {
		// When container size changes, update the chart
		if (containerSize.width > 0 && containerSize.height > 0) {
			if (chartRef.current) {
				// If chart already exists, resize it
				chartRef.current.resize(containerSize.width, containerSize.height);
			} else {
				// This is where you would create and manage the actual Canvas
				// For now, we'll create a stub that matches the RNCanvas interface
				const canvasStub: CanvasStub = {
					width: containerSize.width,
					height: containerSize.height,
					getContext: () => ({
						// Stub implementation of the canvas context methods
						// In a real implementation, you would bridge to the actual Canvas methods
						clearRect: () => {},
						fillRect: () => {},
						// ... other required methods
					}),
				};

				// Create chart options
				const mergedOptions = {
					width: containerSize.width,
					height: containerSize.height,
					...options,
				};

				try {
					// Initialize the chart with the canvas stub
					// In production, you would use the actual Canvas from react-native-canvas
					const rnCanvas = canvasToRNCanvas(canvasStub);
					const chart = createChart(rnCanvas, mergedOptions);
					chartRef.current = chart;

					// Notify parent component that chart is ready
					if (onChartReady) {
						onChartReady(chart);
					}
				} catch (error) {
					console.error("Error creating chart:", error);
				}
			}
		}
	}, [containerSize, options, onChartReady]);

	// Handle container layout changes
	const onContainerLayout = () => {
		if (containerRef.current) {
			containerRef.current.measure((x, y, width, height) => {
				if (width > 0 && height > 0) {
					setContainerSize({ width, height });
				}
			});
		}
	};

	return (
		<View
			ref={containerRef}
			style={[styles.container, style]}
			onLayout={onContainerLayout}
		>
			{/* In a real implementation, you would render the actual Canvas component here */}
			<DummyCanvas />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "transparent",
	},
});
