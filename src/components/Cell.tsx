import React from 'react';

interface CellProps {
  occupied: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ occupied, onClick }) => {
  return (
    <div
      className={`cell ${occupied ? 'occupied' : ''}`} // Add class based on occupied state
      onClick={onClick} // Click event handler
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick(); // Handle Enter key press for accessibility
        }
      }}
      role="gridcell" // ARIA role for accessibility
      tabIndex={0} // Make cell focusable
    ></div>
  );
};

export default Cell;
