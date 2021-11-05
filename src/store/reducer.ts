import { PayloadAction } from '@reduxjs/toolkit';

import { HistoryMeasurementsData, LatestMeasurementData, SelectedMetricData } from './type';
import { MeasurementDataResponse } from '../Features/Chart/type';

const historyData: HistoryMeasurementsData[] = [];

const latestData: LatestMeasurementData = {};

const selectedMetrics: SelectedMetricData = {
  oilTemp: false,
  waterTemp: false,
  injValveOpen: false,
  flareTemp: false,
  tubingPressure: false,
  casingPressure: false,
};

const initialState = {
  historyData,
  latestData,
  selectedMetrics,
};

const toHourAndMin = (time: string) => {
  const date = new Date(time);
  const hr = date.getHours();
  const min = date.getMinutes();

  return `${hr}:${min}`;
};

export default function reducer(state = initialState, action: PayloadAction<MeasurementDataResponse>) {
  switch (action.type) {
    case 'UPDATE_MEASUREMENT': {
      const newHisotryData = state.historyData;
      const { metric, at, value } = action.payload.newMeasurement;

      while (newHisotryData.length >= 1800) {
        newHisotryData.shift();
      }

      const n = newHisotryData.length;
      if (n > 0 && !newHisotryData[n - 1][metric]) {
        newHisotryData[n - 1] = {
          ...newHisotryData[n - 1],
          [metric]: value,
        };
      } else {
        newHisotryData.push({
          at: toHourAndMin(at),
          [metric]: value,
        });
      }

      const newLatestData = {
        ...state.latestData,
        [metric]: value,
      };

      return {
        ...state,
        historyData: newHisotryData,
        latestData: newLatestData,
      };
    }
    default:
      return state;
  }
}
