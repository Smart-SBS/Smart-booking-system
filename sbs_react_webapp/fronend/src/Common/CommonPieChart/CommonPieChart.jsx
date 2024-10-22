import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const CommonPieChart = ({ data, total }) => {
  const fillPercentage = (data / total) * 100;
  const remainingPercentage = 100 - fillPercentage;
  return (
    <div className="">
      <PieChart width={16} height={16}>
        <Pie
          data={[
            { name: 'Filled', value: fillPercentage },
            { name: 'Remaining', value: remainingPercentage },
          ]}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          cx="50%"
          cy="50%"
          outerRadius={8}
          innerRadius={0}
          fill="#fff4dd"
          stroke="none"
        >
          <Cell fill="#ff9900" />
        </Pie>
      </PieChart>
    </div>
  );
};

export default CommonPieChart;
