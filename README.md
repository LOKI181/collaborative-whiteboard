# CollabBoard - Real-Time Collaborative Whiteboard

A real-time collaborative whiteboard application built with React and TypeScript. Features multiple drawing tools, smooth canvas rendering, and simulated multi-user collaboration.

## Features

- **Drawing Tools**: Pen, Line, Rectangle, Circle, and Eraser
- **Color Palette**: 6 vibrant colors to choose from
- **Stroke Width**: 4 different brush sizes
- **Undo/Redo**: Full history management
- **Real-time Collaboration**: Simulated multi-user cursors
- **Responsive Design**: Works on all screen sizes

## Tech Stack

- React 19 + TypeScript
- HTML5 Canvas API
- Custom hooks for state management
- CSS3 with modern features

## Interview Highlights

- **Performance**: Uses `useRef` for canvas coordinates to prevent unnecessary re-renders
- **State Management**: Custom `useWhiteboard` hook with undo/redo stack
- **Real-time Simulation**: `useCollaboration` hook simulates WebSocket-like behavior
- **Canvas Rendering**: Optimized drawing with `useMemo` and requestAnimationFrame

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
