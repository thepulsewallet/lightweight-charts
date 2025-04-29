# Lightweight Charts React Native Examples

This directory contains examples demonstrating how to use TradingView Lightweight Charts with React Native.

## Installation

Make sure you have React Native set up in your environment. If not, follow the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide.

1. First, install the lightweight-charts-react-native package:

```bash
npm install lightweight-charts-react-native
```

2. Install required dependencies:

```bash
npm install react-native-canvas react-native-webview
```

3. For iOS, install the CocoaPods dependencies:

```bash
cd ios && pod install
```

## Examples

### Basic Chart Example

The `SimpleChartExample.tsx` shows a basic implementation of:

- Line chart
- Candlestick chart
- Bar chart

To run this example:

1. Copy the component to your project
2. Import it where needed:

```jsx
import SimpleChartExample from "./path/to/SimpleChartExample";
```

3. Use it in your screens:

```jsx
<SimpleChartExample />
```

## Customizing Charts

You can customize the appearance and behavior of charts by:

1. Modifying the `options` prop on the Chart component
2. Using the chart API methods available through the `onChartReady` callback

### Styling Examples

```jsx
// Custom dark theme
<Chart
  style={styles.chart}
  options={{
    width: 400,
    height: 300,
    layout: {
      background: { color: '#222' },
      textColor: 'rgba(255, 255, 255, 0.9)',
    },
    grid: {
      vertLines: { color: 'rgba(70, 70, 70, 0.5)' },
      horzLines: { color: 'rgba(70, 70, 70, 0.5)' },
    },
  }}
  onChartReady={handleChartReady}
/>

// Custom light theme
<Chart
  style={styles.chart}
  options={{
    width: 400,
    height: 300,
    layout: {
      background: { color: '#ffffff' },
      textColor: '#333333',
    },
    grid: {
      vertLines: { color: 'rgba(220, 220, 220, 0.8)' },
      horzLines: { color: 'rgba(220, 220, 220, 0.8)' },
    },
  }}
  onChartReady={handleChartReady}
/>
```

## Troubleshooting

### Common Issues

1. **Chart not rendering**

   - Make sure your container has proper dimensions
   - Check if the Canvas is properly initialized

2. **Chart not updating with new data**

   - Use the series reference returned from `addSeries()` to update data

3. **Performance issues**
   - Reduce the amount of data points
   - Use appropriate series type for your data
   - Avoid unnecessary re-renders

### Getting Help

If you encounter any issues:

- Check the [full documentation](https://tradingview.github.io/lightweight-charts/)
- Open an issue on [GitHub](https://github.com/tradingview/lightweight-charts/issues)
- Ask in the [TradingView Discord community](https://discord.gg/UC7cGkvn4U)
