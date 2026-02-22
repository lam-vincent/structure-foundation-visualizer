import { memo } from 'react';
import type { CSSProperties } from 'react';
import type { CellColor, GridPoint } from '../../types';
import './GridCell.css';

interface GridCellProps {
  row: number;
  col: number;
  color: CellColor;
  isInPreview: boolean;
  isEraser: boolean;
  previewColor: string | null;
  onMouseDown: (p: GridPoint) => void;
  onMouseEnter: (p: GridPoint) => void;
}

const GridCell = memo(({
  row,
  col,
  color,
  isInPreview,
  isEraser,
  previewColor,
  onMouseDown,
  onMouseEnter,
}: GridCellProps) => {
  const style: CSSProperties = {};

  if (isInPreview) {
    if (isEraser) {
      style.backgroundColor = 'rgba(220, 50, 50, 0.55)';
      style.backgroundImage = 'none';
    } else if (previewColor) {
      style.backgroundColor = previewColor;
      style.backgroundImage = 'none';
      style.opacity = 0.7;
    }
  } else if (color) {
    style.backgroundColor = color;
    style.backgroundImage = 'none';
  }

  return (
    <div
      className="grid-cell"
      style={style}
      onMouseDown={() => onMouseDown({ row, col })}
      onMouseEnter={() => onMouseEnter({ row, col })}
    />
  );
});

GridCell.displayName = 'GridCell';

export default GridCell;
