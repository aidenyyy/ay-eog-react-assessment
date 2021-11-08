import { LinearProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, XAxis, YAxis, Legend, Tooltip, CartesianGrid, Line, ResponsiveContainer } from 'recharts';
import { IState } from '../../store';
import { useCustomQuery, useSubscriptions } from '../hooks';

const Chart = () => {
  const isDataSet = useCustomQuery();

  const chartData = useSubscriptions();

  const selectedMetrics = useSelector((state: IState) => state.selectedMetrics);

  const hasTempMetric = selectedMetrics.some((metrics) => ['waterTemp', 'oilTemp', 'flareTemp'].includes(metrics));
  const hasPressureMetric = selectedMetrics.some((metrics) => ['tubingPressure', 'casingPressure'].includes(metrics));
  const hasPercentageMetric = selectedMetrics.some((metrics) => ['injValveOpen'].includes(metrics));

  if (!isDataSet) return <LinearProgress />;
  if (selectedMetrics.length === 0) return <></>;

  return (
    <ResponsiveContainer width="90%" height={500}>
      <LineChart data={chartData.slice(0, chartData.length - 1)}>
        <XAxis dataKey="at" />
        <YAxis unit="F" yAxisId={0} hide={!hasTempMetric} />
        <YAxis unit="%" yAxisId={1} hide={!hasPercentageMetric} dataKey="injValveOpen" />
        <YAxis unit="PSI" yAxisId={2} hide={!hasPressureMetric} dataKey="tubingPressure" />
        <Legend verticalAlign="bottom" height={36} />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        {selectedMetrics.includes('oilTemp') && <Line type="monotone" dataKey="oilTemp" stroke="#8884d8" />}
        {selectedMetrics.includes('waterTemp') && <Line type="monotone" dataKey="waterTemp" stroke="#7892ca" />}
        {selectedMetrics.includes('injValveOpen') && <Line type="monotone" dataKey="injValveOpen" stroke="#78c495" />}
        {selectedMetrics.includes('flareTemp') && <Line type="monotone" dataKey="flareTemp" stroke="#5fce49" />}
        {selectedMetrics.includes('tubingPressure') && (
          <Line type="monotone" dataKey="tubingPressure" stroke="#d3c15a" />
        )}
        {selectedMetrics.includes('casingPressure') && (
          <Line type="monotone" dataKey="casingPressure" stroke="#aa4c46" />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
