export type Tool = 'pen' | 'line' | 'rectangle' | 'circle' | 'eraser' | 'select';

export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  tool: Tool;
  points: Point[];
  color: string;
  strokeWidth: number;
  userId: string;
  timestamp: number;
}

export interface User {
  id: string;
  name: string;
  color: string;
  cursor: Point | null;
}

export interface WhiteboardState {
  strokes: Stroke[];
  undoneStrokes: Stroke[];
  activeUsers: User[];
}
