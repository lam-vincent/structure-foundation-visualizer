import { PALETTE } from '../../constants';
import type { SelectedTool } from '../../types';
import './ColorPalette.css';

interface ColorPaletteProps {
  selectedTool: SelectedTool;
  onSelectTool: (tool: SelectedTool) => void;
}

export default function ColorPalette({ selectedTool, onSelectTool }: ColorPaletteProps) {
  return (
    <div className="color-palette">
      {PALETTE.map(({ id, label, color }) => (
        <button
          key={id}
          className={`palette-swatch${selectedTool === color ? ' selected' : ''}`}
          style={{ backgroundColor: color }}
          title={label}
          aria-label={label}
          aria-pressed={selectedTool === color}
          onClick={() => onSelectTool(color)}
        />
      ))}
      <button
        className={`palette-eraser${selectedTool === 'eraser' ? ' selected' : ''}`}
        title="Eraser"
        aria-label="Eraser"
        aria-pressed={selectedTool === 'eraser'}
        onClick={() => onSelectTool('eraser')}
      >
        ✕
      </button>
    </div>
  );
}
