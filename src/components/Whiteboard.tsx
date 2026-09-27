import React, { useCallback } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { useWhiteboard } from '../hooks/useWhiteboard';
import { useCollaboration } from '../hooks/useCollaboration';
import { Toolbar } from './Toolbar';
import { UserPanel } from './UserPanel';
import { UserCursors } from './UserCursors';

export const Whiteboard: React.FC = () => {
  const {
    strokes,
    currentStroke,
    activeTool,
    setActiveTool,
    activeColor,
    setActiveColor,
    strokeWidth,
    setStrokeWidth,
    startDrawing,
    draw,
    endDrawing,
    undo,
    redo,
    clearCanvas,
    canUndo,
    canRedo,
  } = useWhiteboard();

  const { activeUsers, updateLocalCursor } = useCollaboration();
  const { canvasRef } = useCanvas(strokes, currentStroke);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      startDrawing(e.clientX - rect.left, e.clientY - rect.top);
    },
    [startDrawing, canvasRef]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      updateLocalCursor({ x, y });
      draw(x, y);
    },
    [draw, updateLocalCursor, canvasRef]
  );

  const handleMouseUp = useCallback(() => {
    endDrawing();
  }, [endDrawing]);

  const handleMouseLeave = useCallback(() => {
    endDrawing();
    updateLocalCursor(null);
  }, [endDrawing, updateLocalCursor]);

  return (
    <div className="whiteboard-app">
      <header className="app-header">
        <div className="header-logo">🎨</div>
        <h1>CollabBoard</h1>
        <span className="subtitle">Real-Time Collaborative Whiteboard</span>
        <div className="header-spacer" />
        <div className="header-status">
          <span className="status-dot" />
          {activeUsers.length + 1} connected
        </div>
      </header>

      <Toolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        activeColor={activeColor}
        onColorChange={setActiveColor}
        strokeWidth={strokeWidth}
        onStrokeWidthChange={setStrokeWidth}
        onUndo={undo}
        onRedo={redo}
        onClear={clearCanvas}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      <div className="whiteboard-container">
        <div className="canvas-wrapper">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          />
          <UserCursors users={activeUsers} />
          <div className="shortcuts-hint">
            <span className="shortcut"><kbd>P</kbd> Pen</span>
            <span className="shortcut"><kbd>L</kbd> Line</span>
            <span className="shortcut"><kbd>R</kbd> Rect</span>
            <span className="shortcut"><kbd>C</kbd> Circle</span>
            <span className="shortcut"><kbd>E</kbd> Eraser</span>
            <span className="shortcut"><kbd>Ctrl+Z</kbd> Undo</span>
          </div>
        </div>
        <UserPanel users={activeUsers} />
      </div>

      <footer className="app-footer">
        <span>{strokes.length} stroke{strokes.length !== 1 ? 's' : ''}</span>
        <span className="footer-dot" />
        <span>{activeUsers.length + 1} user{activeUsers.length > 0 ? 's' : ''}</span>
        <span className="footer-dot" />
        <span>Canvas API + React</span>
      </footer>
    </div>
  );
};
