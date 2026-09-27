import { useState, useCallback, useRef } from 'react';
import type { Stroke, Tool } from '../types';
import { v4 as uuidv4 } from 'uuid';

const COLORS = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080'];
const STROKE_WIDTHS = [2, 4, 6, 8];

export function useWhiteboard() {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [undoneStrokes, setUndoneStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTHS[0]);
  const [userId] = useState(() => uuidv4());

  const isDrawing = useRef(false);

  const startDrawing = useCallback(
    (x: number, y: number) => {
      isDrawing.current = true;
      const newStroke: Stroke = {
        id: uuidv4(),
        tool: activeTool,
        points: [{ x, y }],
        color: activeTool === 'eraser' ? '#FFFFFF' : activeColor,
        strokeWidth: activeTool === 'eraser' ? 20 : strokeWidth,
        userId,
        timestamp: Date.now(),
      };
      setCurrentStroke(newStroke);
    },
    [activeTool, activeColor, strokeWidth, userId]
  );

  const draw = useCallback(
    (x: number, y: number) => {
      if (!isDrawing.current || !currentStroke) return;

      if (activeTool === 'pen' || activeTool === 'eraser') {
        setCurrentStroke((prev) =>
          prev ? { ...prev, points: [...prev.points, { x, y }] } : null
        );
      } else if (activeTool === 'line' || activeTool === 'rectangle' || activeTool === 'circle') {
        setCurrentStroke((prev) =>
          prev ? { ...prev, points: [prev.points[0], { x, y }] } : null
        );
      }
    },
    [currentStroke, activeTool]
  );

  const endDrawing = useCallback(() => {
    if (!isDrawing.current || !currentStroke) return;
    isDrawing.current = false;

    if (currentStroke.points.length > 1) {
      setStrokes((prev) => [...prev, currentStroke]);
    }
    setCurrentStroke(null);
    setUndoneStrokes([]);
  }, [currentStroke]);

  const undo = useCallback(() => {
    if (strokes.length === 0) return;
    const lastStroke = strokes[strokes.length - 1];
    setStrokes((prev) => prev.slice(0, -1));
    setUndoneStrokes((prev) => [...prev, lastStroke]);
  }, [strokes]);

  const redo = useCallback(() => {
    if (undoneStrokes.length === 0) return;
    const lastUndone = undoneStrokes[undoneStrokes.length - 1];
    setUndoneStrokes((prev) => prev.slice(0, -1));
    setStrokes((prev) => [...prev, lastUndone]);
  }, [undoneStrokes]);

  const clearCanvas = useCallback(() => {
    setStrokes([]);
    setUndoneStrokes([]);
    setCurrentStroke(null);
  }, []);

  return {
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
    canUndo: strokes.length > 0,
    canRedo: undoneStrokes.length > 0,
  };
}
