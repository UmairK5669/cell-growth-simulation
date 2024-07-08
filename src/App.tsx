import React, { useState, useCallback, useEffect } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';
import GrowthChart from './components/GrowthChart';
import useInterval from './hooks/useInterval';
import './App.css';

const GRID_SIZE = 20;

const createEmptyGrid = (size: number) => {
  return Array.from({ length: size }, () => Array(size).fill(false));
};

const App: React.FC = () => {
  const [gridSize, setGridSize] = useState(GRID_SIZE);
  const [grid, setGrid] = useState<boolean[][]>(createEmptyGrid(gridSize));
  const [running, setRunning] = useState(false);
  const [interval, setInterval] = useState(1000);
  const [growthRate, setGrowthRate] = useState<number[]>([]);

  const handleCellClick = (x: number, y: number) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === x && colIndex === y ? !cell : cell
      )
    );
    setGrid(newGrid);
  };

  const getAdjacentCells = (x: number, y: number) => {
    const adj = [];
    if (x > 0) adj.push([x - 1, y]);
    if (x < gridSize - 1) adj.push([x + 1, y]);
    if (y > 0) adj.push([x, y - 1]);
    if (y < gridSize - 1) adj.push([x, y + 1]);
    return adj;
  };

  const runSimulation = useCallback(() => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => row.slice());
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          if (prevGrid[x][y]) {
            const adjCells = getAdjacentCells(x, y);
            const emptyAdjCells = adjCells.filter(
              ([adjX, adjY]) => !prevGrid[adjX][adjY]
            );
            if (emptyAdjCells.length > 0) {
              const [newX, newY] =
                emptyAdjCells[Math.floor(Math.random() * emptyAdjCells.length)];
              newGrid[newX][newY] = true;
            }
          }
        }
      }
      return newGrid;
    });
  }, [gridSize]);

  useInterval(() => {
    if (running) runSimulation();
  }, interval);

  useEffect(() => {
    const occupiedCount = grid.flat().filter((cell) => cell).length;
    setGrowthRate((prev) => [...prev, occupiedCount]);
  }, [grid]);

  const handleGridSizeChange = (size: number) => {
    setGridSize(size);
    setGrid(createEmptyGrid(size));
    setGrowthRate([]);
  };

  return (
    <div className="App">
      <h1>Cell Growth Simulation</h1>
      <Grid grid={grid} onCellClick={handleCellClick} />
      <Controls
        onStart={() => setRunning(true)}
        onPause={() => setRunning(false)}
        onReset={() => {
          setRunning(false);
          setGrid(createEmptyGrid(gridSize));
          setGrowthRate([]);
        }}
        onIntervalChange={setInterval}
        onGridSizeChange={handleGridSizeChange}
      />
      <GrowthChart data={growthRate} />
    </div>
  );
};

export default App;
