import { useState, useCallback } from 'react';
import { PALETTE, DEFAULT_COLS } from './constants';
import type { GridPoint, SelectedTool } from './types';
import { useGridState } from './hooks/useGridState';
import { useDragSelect } from './hooks/useDragSelect';
import Grid from './components/Grid/Grid';
import Toolbar from './components/Toolbar/Toolbar';
import ColorPalette from './components/ColorPalette/ColorPalette';
import './App.css';

function App() {
  const [selectedTool, setSelectedTool] = useState<SelectedTool>(PALETTE[0].color);
  const { grid, paintRect, resize, clearAll } = useGridState();

  const handleCommit = useCallback((start: GridPoint, end: GridPoint) => {
    paintRect(start, end, selectedTool === 'eraser' ? null : selectedTool);
  }, [selectedTool, paintRect]);

  const { dragState, handleMouseDown, handleMouseEnter } = useDragSelect({
    onCommit: handleCommit,
  });

  const handleResize = useCallback((newRows: number, newCols: number) => {
    resize(newRows, newCols);
  }, [resize]);

  const rows = grid.length;
  const cols = grid[0]?.length ?? DEFAULT_COLS;

  return (
    <div className="app">
      <Toolbar rows={rows} cols={cols} onResize={handleResize} onClear={clearAll} />
      <div className="main-area">
        <ColorPalette selectedTool={selectedTool} onSelectTool={setSelectedTool} />
        <Grid
          grid={grid}
          dragState={dragState}
          selectedTool={selectedTool}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
        />
      </div>
    </div>
  );
}

export default App;
