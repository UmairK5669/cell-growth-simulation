import React from 'react';

interface GrowthChartProps {
  data: number[];
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  const max = Math.max(...data, 1);
  const chartWidth = 400;
  const chartHeight = 200;

  return (
    <div className="growth-chart">
      <svg width={chartWidth} height={chartHeight}>
        {data.map((value, index) => (
          <rect
            key={index}
            x={(index * chartWidth) / data.length}
            y={chartHeight - (value * chartHeight) / max}
            width={Math.max(1, chartWidth / data.length - 1)}
            height={(value * chartHeight) / max}
            fill="green"
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
