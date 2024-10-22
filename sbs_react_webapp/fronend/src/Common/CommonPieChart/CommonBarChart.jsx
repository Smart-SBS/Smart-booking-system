import React from 'react';
import '../CommonPieChart/chartStyle.css';

const SmallBarChart = ({ data }) => {
  const chartWidth = 40;
  const chartHeight = 20;

  const maxData = Math.max(...data);
  const scaleFactor = chartHeight / maxData;

  const barWidth = chartWidth / data.length;

  return (
    <svg className='small-bar-chart' width={chartWidth} height={chartHeight}>
      {data.map((value, index) => (
        <rect
          key={index}
          x={index * barWidth}
          y={chartHeight - value * scaleFactor}
          width={barWidth}
          height={value * scaleFactor}
          fill="blue"
        />
      ))}
    </svg>
  );
};

export default SmallBarChart;
