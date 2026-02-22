import { useState, useEffect } from 'react';
import { MIN_GRID_SIZE, MAX_GRID_SIZE } from '../../constants';
import './Toolbar.css';

interface ToolbarProps {
  rows: number;
  cols: number;
  onResize: (rows: number, cols: number) => void;
  onClear: () => void;
}

function clamp(v: number): number {
  return Math.max(MIN_GRID_SIZE, Math.min(MAX_GRID_SIZE, v));
}

export default function Toolbar({ rows, cols, onResize, onClear }: ToolbarProps) {
  const [rowInput, setRowInput] = useState(String(rows));
  const [colInput, setColInput] = useState(String(cols));

  // Keep inputs in sync when the grid dimensions change externally.
  useEffect(() => setRowInput(String(rows)), [rows]);
  useEffect(() => setColInput(String(cols)), [cols]);

  const commitRows = () => {
    const value = clamp(parseInt(rowInput) || MIN_GRID_SIZE);
    setRowInput(String(value));
    onResize(value, cols);
  };

  const commitCols = () => {
    const value = clamp(parseInt(colInput) || MIN_GRID_SIZE);
    setColInput(String(value));
    onResize(rows, value);
  };

  return (
    <header className="toolbar">
      <h1 className="toolbar-title">Minecraft Structure Foundation Visualizer</h1>
      <div className="toolbar-controls">
        <label className="toolbar-label">
          Rows
          <input
            type="number"
            className="toolbar-input"
            value={rowInput}
            min={MIN_GRID_SIZE}
            max={MAX_GRID_SIZE}
            onChange={e => setRowInput(e.target.value)}
            onBlur={commitRows}
            onKeyDown={e => e.key === 'Enter' && commitRows()}
          />
        </label>
        <label className="toolbar-label">
          Cols
          <input
            type="number"
            className="toolbar-input"
            value={colInput}
            min={MIN_GRID_SIZE}
            max={MAX_GRID_SIZE}
            onChange={e => setColInput(e.target.value)}
            onBlur={commitCols}
            onKeyDown={e => e.key === 'Enter' && commitCols()}
          />
        </label>
        <button className="toolbar-btn" onClick={onClear}>
          Clear
        </button>
      </div>
    </header>
  );
}
