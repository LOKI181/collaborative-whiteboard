import React from 'react';
import type { Tool } from '../types';

const TOOLS: { tool: Tool; icon: string; label: string }[] = [
  { tool: 'pen', icon: '✏️', label: 'Pen' },
  { tool: 'line', icon: '📏', label: 'Line' },
  { tool: 'rectangle', icon: '⬜', label: 'Rectangle' },
  { tool: 'circle', icon: '⭕', label: 'Circle' },
  { tool: 'eraser', icon: '🧹', label: 'Eraser' },
];

const COLORS = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080'];
const STROKE_WIDTHS = [2, 4, 6, 8];

interface ToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  activeColor: string;
  onColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  onToolChange,
  activeColor,
  onColorChange,
  strokeWidth,
  onStrokeWidthChange,
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-group">
        {TOOLS.map(({ tool, icon, label }) => (
          <button
            key={tool}
            className={`tool-btn ${activeTool === tool ? 'active' : ''}`}
            onClick={() => onToolChange(tool)}
            title={label}
          >
            {icon}
          </button>
        ))}
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group colors">
        {COLORS.map((color) => (
          <button
            key={color}
            className={`color-btn ${activeColor === color ? 'active' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        {STROKE_WIDTHS.map((width) => (
          <button
            key={width}
            className={`width-btn ${strokeWidth === width ? 'active' : ''}`}
            onClick={() => onStrokeWidthChange(width)}
          >
            <span style={{ width: width * 2, height: width * 2 }} />
          </button>
        ))}
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button className="action-btn" onClick={onUndo} disabled={!canUndo} title="Undo">
          ↩️
        </button>
        <button className="action-btn" onClick={onRedo} disabled={!canRedo} title="Redo">
          ↪️
        </button>
        <button className="action-btn" onClick={onClear} title="Clear All">
          🗑️
        </button>
      </div>
    </div>
  );
};
