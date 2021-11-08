/* eslint-disable @typescript-eslint/indent */
/* eslint-disable import/extensions */
import {
  MeasurementData,
  MeasurementDataResponse,
  MultipleMeasurementsDataResponse,
  HistoryMeasurementsData,
  LatestMeasurementData,
} from '../type';

const historyData: HistoryMeasurementsData[] = [];

const latestData: LatestMeasurementData = {};

const selectedMetrics: string[] = [];

const initialState = {
  historyData,
  latestData,
  selectedMetrics,
};

const toHourAndMin = (time: string) => {
  const date = new Date(time);
  const hr = date.getHours();
  const min = date.getMinutes();

  return min < 10 ? `${hr}:0${min}` : `${hr}:${min}`;
};

export default function reducer(
  state = initialState,
  action: {
    type: any;
    payload: { newMeasurement?: MeasurementData; metric?: string[]; measurements?: MeasurementData[] };
  },
) {
  switch (action.type) {
    case 'UPDATE_MEASUREMENT': {
      const newHisotryData = state.historyData;
      const { newMeasurement } = action.payload as MeasurementDataResponse;
      const { metric, at, value } = newMeasurement;

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
    case 'SET_HISTORY_MEASUREMENTS': {
      const { getMultipleMeasurements } = action.payload as MultipleMeasurementsDataResponse;

      const oilTempMeasurements = getMultipleMeasurements[0].measurements;
      const waterTempMeasurements = getMultipleMeasurements[1].measurements;
      const injValueMeasurements = getMultipleMeasurements[2].measurements;
      const flareTempMeasurements = getMultipleMeasurements[3].measurements;
      const tubingPressureMeasurements = getMultipleMeasurements[4].measurements;
      const casingPressureMeasurements = getMultipleMeasurements[5].measurements;

      const newHisotryData: HistoryMeasurementsData[] = [];

      for (let i = 0; i < oilTempMeasurements.length; i += 1) {
        newHisotryData.push({
          at: toHourAndMin(oilTempMeasurements[i].at),
          oilTemp: oilTempMeasurements[i].value,
          waterTemp: waterTempMeasurements[i].value,
          injValveOpen: injValueMeasurements[i].value,
          flareTemp: flareTempMeasurements[i].value,
          tubingPressure: tubingPressureMeasurements[i].value,
          casingPressure: casingPressureMeasurements[i].value,
        });
      }

      return {
        ...state,
        historyData: newHisotryData,
      };
    }
    case 'SET_SELECTED_METRICS': {
      const metric = action.payload as string[];
      const newState = metric
        ? {
            ...state,
            selectedMetrics: metric,
          }
        : state;
      return newState;
    }
    default:
      return state;
  }
}
