import { MeasurementDataResponse } from '../Features/Chart/type';

export const updateMeasurement = (measurement: MeasurementDataResponse) => ({
  type: 'UPDATE_MEASUREMENT',
  payload: measurement,
});
