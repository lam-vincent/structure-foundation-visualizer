import { memo, useCallback } from 'react';
import type { GridData, GridPoint, DragState, SelectedTool } from '../../types';
import { CELL_SIZE_PX } from '../../constants';
import GridRow from './GridRow';
import './Grid.css';

interface GridProps {
  grid: GridData;
  dragState: DragState;
  selectedTool: SelectedTool;
  onMouseDown: (p: GridPoint) => void;
  onMouseEnter: (p: GridPoint) => void;
}

const Grid = memo(({
  grid,
  dragState,
  selectedTool,
  onMouseDown,
  onMouseEnter,
}: GridProps) => {
  const cols = grid[0]?.length ?? 0;

  // Compute preview rectangle from drag state.
  let previewMinRow = -1;
  let previewMaxRow = -1;
  let previewMinCol = -1;
  let previewMaxCol = -1;
  if (dragState.active) {
    previewMinRow = Math.min(dragState.start.row, dragState.current.row);
    previewMaxRow = Math.max(dragState.start.row, dragState.current.row);
    previewMinCol = Math.min(dragState.start.col, dragState.current.col);
    previewMaxCol = Math.max(dragState.start.col, dragState.current.col);
  }

  const isEraser = selectedTool === 'eraser';
  const previewColor = isEraser ? null : selectedTool;

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div
      className="grid-container"
      style={{ gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE_PX}px)` }}
      onContextMenu={handleContextMenu}
    >
      {grid.map((cells, rowIndex) => {
        const isRowInPreview =
          previewMinRow >= 0 &&
          rowIndex >= previewMinRow &&
          rowIndex <= previewMaxRow;
        return (
          <GridRow
            key={rowIndex}
            rowIndex={rowIndex}
            cells={cells}
            previewMinCol={isRowInPreview ? previewMinCol : -1}
            previewMaxCol={isRowInPreview ? previewMaxCol : -1}
            isEraser={isEraser}
            previewColor={previewColor}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
          />
        );
      })}
    </div>
  );
});

Grid.displayName = 'Grid';

export default Grid;
