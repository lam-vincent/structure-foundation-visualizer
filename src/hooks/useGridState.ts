import { useState, useCallback } from 'react';
import type { GridData, GridPoint, CellColor } from '../types';
import { DEFAULT_ROWS, DEFAULT_COLS } from '../constants';

function createEmptyGrid(rows: number, cols: number): GridData {
  return Array.from({ length: rows }, () => Array<CellColor>(cols).fill(null));
}

export function useGridState() {
  const [grid, setGrid] = useState<GridData>(() =>
    createEmptyGrid(DEFAULT_ROWS, DEFAULT_COLS)
  );

  // Only spreads row arrays that are actually modified → unchanged rows keep
  // the same reference, enabling GridRow.memo bail-out.
  const paintRect = useCallback((a: GridPoint, b: GridPoint, color: CellColor) => {
    const minRow = Math.min(a.row, b.row);
    const maxRow = Math.max(a.row, b.row);
    const minCol = Math.min(a.col, b.col);
    const maxCol = Math.max(a.col, b.col);

    setGrid(prev => {
      const next = prev.slice();
      for (let r = minRow; r <= maxRow; r++) {
        const newRow = prev[r].slice();
        for (let c = minCol; c <= maxCol; c++) {
          newRow[c] = color;
        }
        next[r] = newRow;
      }
      return next;
    });
  }, []);

  const resize = useCallback((rows: number, cols: number) => {
    setGrid(prev => {
      const next = createEmptyGrid(rows, cols);
      const copyRows = Math.min(rows, prev.length);
      for (let r = 0; r < copyRows; r++) {
        const copyCols = Math.min(cols, prev[r].length);
        for (let c = 0; c < copyCols; c++) {
          next[r][c] = prev[r][c];
        }
      }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setGrid(prev =>
      createEmptyGrid(prev.length, prev[0]?.length ?? DEFAULT_COLS)
    );
  }, []);

  return { grid, paintRect, resize, clearAll };
}
