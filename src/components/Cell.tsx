import React from 'react';

interface CellProps {
  occupied: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ occupied, onClick }) => {
  return (
    <div
      className={`cell ${occupied ? 'occupied' : ''}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick();
        }
      }}
      role="gridcell"
      tabIndex={0}
    ></div>
  );
};

export default Cell;
