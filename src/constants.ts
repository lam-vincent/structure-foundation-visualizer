import type { PaletteColor } from './types';

export const DEFAULT_ROWS = 20;
export const DEFAULT_COLS = 20;
export const CELL_SIZE_PX = 28;
export const MIN_GRID_SIZE = 5;
export const MAX_GRID_SIZE = 50;

export const PALETTE: PaletteColor[] = [
  { id: 'grass',       label: 'Grass',       color: '#5D9E38' },
  { id: 'dirt',        label: 'Dirt',        color: '#8B5E3C' },
  { id: 'stone',       label: 'Stone',       color: '#7A7A7A' },
  { id: 'sand',        label: 'Sand',        color: '#DCD28A' },
  { id: 'water',       label: 'Water',       color: '#2E6EBF' },
  { id: 'lava',        label: 'Lava',        color: '#E06A1C' },
  { id: 'obsidian',    label: 'Obsidian',    color: '#1D1021' },
  { id: 'snow',        label: 'Snow',        color: '#F0F0F0' },
  { id: 'ice',         label: 'Ice',         color: '#A0C8E0' },
  { id: 'netherrack',  label: 'Netherrack',  color: '#7D2020' },
  { id: 'gold-block',  label: 'Gold Block',  color: '#F5D43D' },
  { id: 'iron-block',  label: 'Iron Block',  color: '#D8D8D8' },
  { id: 'cobblestone', label: 'Cobblestone', color: '#5E5E5E' },
  { id: 'gravel',      label: 'Gravel',      color: '#9E9080' },
  { id: 'oak-log',     label: 'Oak Log',     color: '#6B4D2A' },
  { id: 'oak-plank',   label: 'Oak Plank',   color: '#C5A35E' },
];
