import { useState, useRef, useCallback, useEffect } from 'react';
import type { DragState, GridPoint } from '../types';

interface UseDragSelectOptions {
  onCommit: (start: GridPoint, end: GridPoint) => void;
}

export function useDragSelect({ onCommit }: UseDragSelectOptions) {
  const [dragState, setDragState] = useState<DragState>({ active: false });
  // Ref mirrors state so event handlers always read the latest value without
  // being re-created on every state change.
  const dragStateRef = useRef<DragState>({ active: false });

  const updateDragState = useCallback((next: DragState) => {
    dragStateRef.current = next;
    setDragState(next);
  }, []);

  const handleMouseDown = useCallback((point: GridPoint) => {
    updateDragState({ active: true, start: point, current: point });
  }, [updateDragState]);

  const handleMouseEnter = useCallback((point: GridPoint) => {
    const prev = dragStateRef.current;
    if (!prev.active) return;
    if (
      prev.current.row === point.row &&
      prev.current.col === point.col
    ) return;
    updateDragState({ ...prev, current: point });
  }, [updateDragState]);

  const handleMouseUp = useCallback(() => {
    const prev = dragStateRef.current;
    if (!prev.active) return;
    onCommit(prev.start, prev.current);
    updateDragState({ active: false });
  }, [onCommit, updateDragState]);

  // Global mouseup — handles release outside the grid.
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  // Escape cancels an in-progress drag without painting.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        updateDragState({ active: false });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [updateDragState]);

  return { dragState, handleMouseDown, handleMouseEnter };
}
