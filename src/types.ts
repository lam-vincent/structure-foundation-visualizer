export type CellColor = string | null; // null = empty cell
export type GridData = CellColor[][];

export interface GridPoint {
  row: number;
  col: number;
}

export type DragState =
  | { active: false }
  | { active: true; start: GridPoint; current: GridPoint };

export type SelectedTool = string; // hex color string or 'eraser'

export interface PaletteColor {
  id: string;
  label: string;
  color: string;
}
