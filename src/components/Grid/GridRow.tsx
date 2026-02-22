import { memo } from 'react';
import type { CellColor, GridPoint } from '../../types';
import GridCell from './GridCell';

interface GridRowProps {
  rowIndex: number;
  cells: CellColor[];
  // -1 means this row has no preview; otherwise these are column bounds.
  previewMinCol: number;
  previewMaxCol: number;
  isEraser: boolean;
  previewColor: string | null;
  onMouseDown: (p: GridPoint) => void;
  onMouseEnter: (p: GridPoint) => void;
}

const GridRow = memo(({
  rowIndex,
  cells,
  previewMinCol,
  previewMaxCol,
  isEraser,
  previewColor,
  onMouseDown,
  onMouseEnter,
}: GridRowProps) => {
  return (
    <>
      {cells.map((color, colIndex) => {
        const isInPreview =
          previewMinCol >= 0 &&
          colIndex >= previewMinCol &&
          colIndex <= previewMaxCol;
        return (
          <GridCell
            key={colIndex}
            row={rowIndex}
            col={colIndex}
            color={color}
            isInPreview={isInPreview}
            isEraser={isEraser}
            previewColor={previewColor}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
          />
        );
      })}
    </>
  );
}, (prev, next) =>
  // Custom comparator: bail out when nothing affecting this row changed.
  prev.cells === next.cells &&
  prev.previewMinCol === next.previewMinCol &&
  prev.previewMaxCol === next.previewMaxCol &&
  prev.isEraser === next.isEraser &&
  prev.previewColor === next.previewColor &&
  prev.onMouseDown === next.onMouseDown &&
  prev.onMouseEnter === next.onMouseEnter
);

GridRow.displayName = 'GridRow';

export default GridRow;
