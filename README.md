<h1 align="center"> Cell Growth Simulation </h1>

<p align="center">
<img width="600" alt="Cell Growth Simulation" src="https://github.com/UmairK5669/cell-growth-simulation/assets/102482696/5cb06e2d-3655-45b3-887e-0db6dfa91885">
</p>
<p align="center">This project is a cell growth simulation web application built using React and TypeScript. The application allows users to simulate cell growth over time on a grid. Users can start, pause, and reset the simulation, adjust the interval speed, and change the grid size dynamically. The application also includes a growth chart to visualize the number of occupied cells over time.
</p>
<h2 align="center"> <a target="_blank" href="https://hugoplate.netlify.app/" rel="nofollow">👀 Demo</a> | <a  target="_blank" href="https://pagespeed.web.dev/analysis/https-hugoplate-netlify-app/6lyxjw6t4r?form_factor=desktop">Page Speed (95+) 🚀</a>

### Features

- Interactive grid where users can toggle cells between occupied and unoccupied states.
- Simulation of cell growth based on adjacent cells.
- Dynamic adjustment of simulation speed (interval).
- Ability to change the grid size.
- Growth chart to visualize the cell growth over time.
- Responsive design for different screen sizes.

## Setup and Running the Project

Follow these instructions to set up and run the project locally.

### Installation

1. **Clone the repository and move to the project directory:**

   ```bash
   git clone https://github.com/your-username/cell-growth-simulation.git
   cd cell-growth-simulation

2. **Running the Project**

   ```bash
   npm start

## Project Structure and Key Components

Here's an overview of the project structure and its key components:

    cell-growth-simulation/
    ├── public/
    │   ├── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Cell.tsx
    │   │   ├── Controls.tsx
    │   │   ├── Grid.tsx
    │   │   └── GrowthChart.tsx
    │   ├── hooks/
    │   │   └── useInterval.ts
    │   ├── styles/
    │   │   └── App.css
    │   ├── App.tsx
    │   ├── index.tsx
    ├── package.json
    ├── tsconfig.json
    └── README.md

### Key Components

- App.tsx: The main component that sets up the grid, controls, and growth chart. It manages the state of the simulation, including the grid, running state, interval, and growth rate.
- Grid.tsx: A component that renders the grid and handles cell click events.
- Cell.tsx: A component that represents a single cell in the grid.
- Controls.tsx: A component that provides controls to start, pause, reset the simulation, and change the interval speed and grid size.
- GrowthChart.tsx: A component that renders the growth chart showing the number of occupied cells over time.
- useInterval.ts: A custom hook that sets up an interval to run the simulation.
- App.css: The main CSS file for styling the application.

### Assumptions and Additional Features

## Assumptions
The initial grid size is set to 20x20.
The simulation logic for cell growth is based on randomly occupying adjacent empty cells.

## Additional Features
Performance optimization for larger grid sizes.
Enhanced visualization for the growth chart.
Saving and loading the simulation state.
Mobile-friendly design improvements.
  
