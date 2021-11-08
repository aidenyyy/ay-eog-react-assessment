export enum MetricEnum {
  oilTemp = 'oilTemp',
  waterTemp = 'waterTemp',
  injValveOpen = 'injValveOpen',
  flareTemp = 'flareTemp',
  tubingPressure = 'tubingPressure',
  casingPressure = 'casingPressure',
}

export type MeasurementData = {
  metric: MetricEnum;
  at: string;
  value: number;
  unit: string;
};

export type MeasurementDataResponse = {
  newMeasurement: MeasurementData;
};

export interface HistoryMeasurementsData {
  at: string;
  oilTemp?: number;
  waterTemp?: number;
  injValveOpen?: number;
  flareTemp?: number;
  tubingPressure?: number;
  casingPressure?: number;
}

type MultipleMeasurementsData = {
  metric: MetricEnum;
  measurements: MeasurementData[];
};

export type MultipleMeasurementsDataResponse = {
  getMultipleMeasurements: MultipleMeasurementsData[];
};

// store

export interface LatestMeasurementData {
  oilTemp?: number;
  waterTemp?: number;
  injValveOpen?: number;
  flareTemp?: number;
  tubingPressure?: number;
  casingPressure?: number;
}
