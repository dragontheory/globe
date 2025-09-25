# Globe Visualization

A lightweight, optimized 3D globe visualization using D3.js, specifically designed to run smoothly on virtual machines, throttled networks, and minimal hardware configurations without GPU acceleration.

## Features

- **Black background semantic HTML page** with responsive design
- **Globe positioned halfway off the left side** of the viewport
- **Full viewport height** spanning from top to bottom
- **Optimized for low-performance environments**:
  - 30 FPS frame rate limiting for CPU efficiency
  - Fallback mode when network resources are unavailable
  - Minimal memory usage
  - RequestAnimationFrame for smooth animations
- **No external dependencies** - all required libraries included locally
- **Responsive design** - automatically adapts to window resizing

## Files

- `index.html` - Main HTML page with semantic structure and black background
- `globe.js` - Globe visualization script with performance optimizations
- `d3.v3.min.js` - D3.js library for data visualization
- `topojson.v1.min.js` - TopoJSON library for geographic data handling

## Usage

1. Open `index.html` in a web browser
2. The globe will automatically start spinning in the background
3. The visualization works with or without the optional world topology data

## Optional World Data

For enhanced visualization with continental outlines, you can add world topology data:

1. Download `world-110m.json` from a TopoJSON data source
2. Place it in the same directory as the other files
3. The globe will automatically use this data when available

## Performance Optimizations

The visualization includes several optimizations for low-end hardware:

- **Frame Rate Limiting**: Capped at 30 FPS to reduce CPU usage
- **Network Fallback**: Works without external data requests
- **Efficient Rendering**: Uses requestAnimationFrame for optimal performance
- **Responsive Sizing**: Globe scales with viewport height
- **Memory Efficient**: Minimal DOM manipulation and canvas updates

## Browser Support

Works in all modern browsers that support HTML5 Canvas and JavaScript ES5.

## License

This visualization uses D3.js and TopoJSON libraries, which are available under their respective open source licenses.