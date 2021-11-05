import { useSubscription } from '@apollo/client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, XAxis, YAxis, Legend, Tooltip, CartesianGrid, Line } from 'recharts';
import { LinearProgress, Typography } from '@material-ui/core';
import { MeasurementDataResponse } from './type';
import { subscriptionQuery } from './query';
import { IState } from '../../store';
import { updateMeasurement } from '../../store/actions';

const Chart = () => {
  const dispatch = useDispatch();

  const measurementData = useSelector((state: IState) => state.historyData);

  const { loading, error, data } = useSubscription<MeasurementDataResponse>(subscriptionQuery, {
    variables: {},
  });

  useEffect(() => {
    if (data) {
      dispatch(updateMeasurement(data));
    }
  }, [data]);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <LineChart width={900} height={500} data={measurementData.slice(0, measurementData.length - 1)}>
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

export default () => <Chart />;
