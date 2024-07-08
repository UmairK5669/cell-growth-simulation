import React, { useState } from 'react';

interface ControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onIntervalChange: (interval: number) => void;
  onGridSizeChange: (size: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  onStart,
  onPause,
  onReset,
  onIntervalChange,
  onGridSizeChange,
}) => {
  const [interval, setInterval] = useState(1000);
  const [gridSize, setGridSize] = useState(20);

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInterval = parseInt(e.target.value, 10);
    setInterval(newInterval);
    onIntervalChange(newInterval);
  };

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setGridSize(newSize);
    onGridSizeChange(newSize);
  };

  return (
    <div className="controls">
      <button onClick={onStart}>Start</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onReset}>Reset</button>
      <input
        type="number"
        value={interval}
        onChange={handleIntervalChange}
        min="100"
      />
      <input
        type="number"
        value={gridSize}
        onChange={handleGridSizeChange}
        min="5"
        max="50"
      />
    </div>
  );
};

export default Controls;
