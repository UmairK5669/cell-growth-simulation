import React from 'react';
import Cell from './Cell';

interface GridProps {
  grid: boolean[][];
  onCellClick: (x: number, y: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, onCellClick }) => {
  const gridSize = grid.length;
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${gridSize}, 20px)` }}
      role="grid"
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            occupied={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
