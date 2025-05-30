/**
 * Deep merges two objects
 * @param target - The target object to merge into
 * @param source - The source object to copy properties from
 * @returns The merged object
 */
export function deepMerge<T>(target: T, source: Partial<T>): T {
	const output = { ...target };

	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach((key) => {
			if (isObject(source[key as keyof typeof source])) {
				if (!(key in target)) {
					Object.assign(output, { [key]: source[key as keyof typeof source] });
				} else {
					(output as any)[key] = deepMerge(
						(target as any)[key],
						(source as any)[key]
					);
				}
			} else {
				Object.assign(output, { [key]: source[key as keyof typeof source] });
			}
		});
	}

	return output;
}

/**
 * Checks if value is an object
 * @param item - The value to check
 * @returns True if the value is an object
 */
export function isObject(item: any): boolean {
	return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Formats a time value for display
 * @param time - The time value to format
 * @param format - Optional format string
 * @returns Formatted time string
 */
export function formatTime(time: string | number, format?: string): string {
	// If time is a number, treat it as a timestamp
	if (typeof time === "number") {
		const date = new Date(time * 1000);
		return date.toLocaleDateString();
	}

	// If time is a string in business day format (YYYY-MM-DD)
	if (typeof time === "string" && /^\d{4}-\d{2}-\d{2}$/.test(time)) {
		const [year, month, day] = time.split("-").map(Number);
		const date = new Date(year, month - 1, day);
		return date.toLocaleDateString();
	}

	return String(time);
}

/**
 * Converts a data point's time to a pixel position on the x-axis
 * @param time - The time value
 * @param visibleRange - The currently visible time range
 * @param width - The available width for the chart
 * @returns The x coordinate for the given time
 */
export function timeToCoordinate(
	time: number | string,
	visibleRange: { from: number | string; to: number | string },
	width: number
): number {
	// Convert time values to numbers for calculation
	const timeValue =
		typeof time === "string" ? new Date(time).getTime() / 1000 : time;
	const fromValue =
		typeof visibleRange.from === "string"
			? new Date(visibleRange.from).getTime() / 1000
			: visibleRange.from;
	const toValue =
		typeof visibleRange.to === "string"
			? new Date(visibleRange.to).getTime() / 1000
			: visibleRange.to;

	// Calculate the position
	const range = toValue - fromValue;
	if (range <= 0) return 0;

	const ratio = (timeValue - fromValue) / range;
	return Math.round(ratio * width);
}

/**
 * Converts a data value to a pixel position on the y-axis
 * @param value - The value to convert
 * @param priceRange - The visible price range
 * @param height - The available height for the chart
 * @param invertYAxis - Whether the y-axis is inverted (price chart convention)
 * @returns The y coordinate for the given value
 */
export function valueToCoordinate(
	value: number,
	priceRange: { min: number; max: number },
	height: number,
	invertYAxis: boolean = true
): number {
	const range = priceRange.max - priceRange.min;
	if (range <= 0) return 0;

	const ratio = (value - priceRange.min) / range;
	const yCoord = invertYAxis ? height - ratio * height : ratio * height;

	return Math.round(yCoord);
}
