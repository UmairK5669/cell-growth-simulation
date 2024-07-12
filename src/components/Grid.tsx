import React from 'react';
import Cell from './Cell';

interface GridProps {
  grid: boolean[][];
  onCellClick: (x: number, y: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, onCellClick }) => {
  const gridSize = grid.length; // Determine the size of the grid
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${gridSize}, 20px)` }} // Define CSS grid columns
      role="grid"
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`} // Unique key for each cell
            occupied={cell} // Cell occupied state
            onClick={() => onCellClick(rowIndex, colIndex)} // Click handler for cell
          />
        ))
      )}
    </div>
  );
};

export default Grid;
