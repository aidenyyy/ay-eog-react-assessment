import { LinearProgress } from '@material-ui/core';
import React from 'react';
import { LineChart, XAxis, YAxis, Legend, Tooltip, CartesianGrid, Line } from 'recharts';
import { useCustomQuery, useSubscriptions } from '../hooks';

const Chart = () => {
  const isDataSet = useCustomQuery();

  const chartData = useSubscriptions();

  if (!isDataSet) return <LinearProgress />;

  return (
    <div>
      <LineChart width={900} height={500} data={chartData.slice(0, chartData.length - 1)}>
        <XAxis dataKey="at" />
        <YAxis unit="F" yAxisId={0} />
        <YAxis unit="%" yAxisId={1} dataKey="injValveOpen" />
        <YAxis unit="PSI" yAxisId={2} dataKey="tubingPressure" />
        <Legend verticalAlign="bottom" height={36} />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="oilTemp" stroke="#8884d8" />
        <Line type="monotone" dataKey="waterTemp" stroke="#7892ca" />
        <Line type="monotone" dataKey="injValveOpen" stroke="#78c495" />
        <Line type="monotone" dataKey="flareTemp" stroke="#5fce49" />
        <Line type="monotone" dataKey="tubingPressure" stroke="#d3c15a" />
        <Line type="monotone" dataKey="casingPressure" stroke="#aa4c46" />
      </LineChart>
    </div>
  );
};

export default Chart;
