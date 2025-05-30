# Implementation Notes

This document outlines the approach taken to port TradingView's Lightweight Charts library to React Native without using WebView.

## Architecture Overview

The port is built on React Native Skia, which provides native hardware-accelerated 2D graphics capabilities that closely match the HTML5 Canvas API used in the original library.

### Core Components

1. **SkiaCanvas**: A React Native component that uses React Native Skia to create a canvas-like drawing surface. It provides a context object that mimics the browser's CanvasRenderingContext2D API.

2. **Chart Component**: The main React component that renders charts using the SkiaCanvas and manages chart state.

3. **Renderers**: A set of functions that draw different types of charts (line, candlestick, etc.) using Skia's drawing primitives.

4. **Series Types**: Support for different data series similar to the original library.

5. **API Compatibility Layer**: Maintains the same API interface as the original library to minimize migration effort.

## Implementation Approach

### Canvas Abstraction

The most critical part of the implementation is creating a wrapper around React Native Skia that provides an API similar to HTML Canvas. This allows us to:

1. Reuse much of the original rendering logic
2. Make the API familiar to users of the original library
3. Simplify porting of additional features in the future

### Rendering Pipeline

The rendering pipeline was rebuilt from scratch using React Native Skia:

1. **Data Transformation**: Converting time series data to screen coordinates
2. **Series Rendering**: Specialized rendering for each chart type
3. **User Interaction**: Touch handling for crosshair, zoom, and pan operations

### Performance Considerations

To maintain good performance on mobile devices:

1. Optimized rendering loops to minimize unnecessary calculations
2. Batch drawing operations where possible
3. Use of memoization to avoid redundant computations
4. Responsive to device screen size and orientation changes

## Limitations and Known Issues

1. **Incomplete Feature Parity**: Some advanced features from the original library are not yet implemented:

   - Advanced price/time scale formatting
   - Full plugin support
   - Some specialized chart types

2. **Performance Differences**: While React Native Skia is performant, there may be some performance differences compared to the browser Canvas implementation.

3. **Platform Specifics**: Some features may behave differently on iOS vs Android due to underlying platform rendering differences.

4. **Work in Progress**: This implementation is a starting point and will need ongoing development to reach feature parity with the original library.

## Future Enhancements

1. Implement full feature parity with the original library
2. Add React Native specific features (like native gestures)
3. Optimize for mobile-specific use cases
4. Add support for native animations
5. Improve touch interaction for mobile users (larger touch targets, etc.)

## Technical Debt

Areas that need improvement:

1. Complete the implementation of all rendering methods in the SkiaCanvasRenderingContext class
2. Add proper error handling and boundary checks
3. More comprehensive type definitions
4. Better test coverage
5. Performance optimization for large datasets

## Contribution Guidelines

When contributing to this port:

1. Follow the original API where possible to maintain compatibility
2. Document any deviations from the original API
3. Consider mobile-specific UX concerns (touch targets, device orientation, etc.)
4. Test on both iOS and Android
5. Focus on performance-critical code paths
