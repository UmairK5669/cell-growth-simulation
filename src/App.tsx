import React, { useState, useCallback, useEffect } from 'react'; 
import Grid from './components/Grid';
import Controls from './components/Controls';
import GrowthChart from './components/GrowthChart';
import useInterval from './hooks/useInterval';
import './App.css';

// Constant for the default grid size
const GRID_SIZE = 20;

// Helper function to create an empty grid of given size
const createEmptyGrid = (size: number) => {
  return Array.from({ length: size }, () => Array(size).fill(false));
};

const App: React.FC = () => {
  // State variables
  const [gridSize, setGridSize] = useState(GRID_SIZE); // Size of the grid
  const [grid, setGrid] = useState<boolean[][]>(createEmptyGrid(gridSize)); // The grid itself
  const [running, setRunning] = useState(false); // If the simulation is running
  const [interval, setInterval] = useState(1000); // Interval for the simulation step in ms
  const [growthRate, setGrowthRate] = useState<number[]>([]); // Track growth over time

  // Handler for cell click events to toggle cell state
  const handleCellClick = (x: number, y: number) => {
    // Map over the grid to update the clicked cell
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === x && colIndex === y ? !cell : cell
      )
    );
    setGrid(newGrid); // Update the grid state with the new grid
  };

  // Function to get adjacent cells of a given cell
  const getAdjacentCells = (x: number, y: number) => {
    const adj = [];
    if (x > 0) adj.push([x - 1, y]); // Check left
    if (x < gridSize - 1) adj.push([x + 1, y]); // Check right
    if (y > 0) adj.push([x, y - 1]); // Check above
    if (y < gridSize - 1) adj.push([x, y + 1]); // Check below
    return adj;
  };

  // Main simulation function to update the grid based on cell growth rules
  const runSimulation = useCallback(() => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => row.slice()); // Clone the previous grid
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          if (prevGrid[x][y]) { // If cell is occupied
            const adjCells = getAdjacentCells(x, y); // Get adjacent cells
            const emptyAdjCells = adjCells.filter(
              ([adjX, adjY]) => !prevGrid[adjX][adjY] // Filter empty adjacent cells
            );
            if (emptyAdjCells.length > 0) { // If there are empty adjacent cells
              const [newX, newY] =
                emptyAdjCells[Math.floor(Math.random() * emptyAdjCells.length)]; // Choose a random empty adjacent cell
              newGrid[newX][newY] = true; // Occupy the chosen cell
            }
          }
        }
      }
      return newGrid; // Return the new grid state
    });
  }, [gridSize]);

  // Custom hook to handle the interval for running the simulation
  useInterval(() => {
    if (running) runSimulation(); // Run the simulation if it's running
  }, interval);

  // Effect to update the growth rate whenever the grid changes
  useEffect(() => {
    const occupiedCount = grid.flat().filter((cell) => cell).length; // Count occupied cells
    setGrowthRate((prev) => [...prev, occupiedCount]); // Append the count to growth rate
  }, [grid]);

  // Handler to change the grid size
  const handleGridSizeChange = (size: number) => {
    setGridSize(size); // Update the grid size state
    setGrid(createEmptyGrid(size)); // Create a new empty grid
    setGrowthRate([]); // Reset the growth rate
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
