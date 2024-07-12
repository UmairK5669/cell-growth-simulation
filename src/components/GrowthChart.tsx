import React from 'react';

interface GrowthChartProps {
  data: number[];
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  const max = Math.max(...data, 1); // Get the maximum value in the data to scale the chart
  const chartWidth = 400;
  const chartHeight = 200;

  return (
    <div className="growth-chart">
      <svg width={chartWidth} height={chartHeight}>
        {data.map((value, index) => (
          <rect
            key={index} // Unique key for each bar
            x={(index * chartWidth) / data.length} // X position of the bar
            y={chartHeight - (value * chartHeight) / max} // Y position of the bar
            width={Math.max(1, chartWidth / data.length - 1)} // Width of the bar
            height={(value * chartHeight) / max} // Height of the bar
            fill="green" // Bar color
          />
        ))}
        {/* X-axis */}
        <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="black" />
        <text x={chartWidth / 2} y={chartHeight + 20} textAnchor="middle">
          Time
        </text>
        {/* Y-axis */}
        <line x1="0" y1="0" x2="0" y2={chartHeight} stroke="black" />
        <text x="-20" y={chartHeight / 2} textAnchor="middle" transform={`rotate(-90, -20, ${chartHeight / 2})`}>
          Occupied Cells
        </text>
      </svg>
    </div>
  );
};

export default GrowthChart;
