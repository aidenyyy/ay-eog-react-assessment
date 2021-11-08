import { MeasurementDataResponse, MultipleMeasurementsDataResponse } from '../type';

export const updateMeasurement = (measurement: MeasurementDataResponse) => ({
  type: 'UPDATE_MEASUREMENT',
  payload: measurement,
});

export const setHistoryMeasurements = (measurements: MultipleMeasurementsDataResponse) => ({
  type: 'SET_HISTORY_MEASUREMENTS',
  payload: measurements,
});

export const setSelectedMetrics = (metric: string[]) => ({
  type: 'SET_SELECTED_METRICS',
  payload: metric,
});
