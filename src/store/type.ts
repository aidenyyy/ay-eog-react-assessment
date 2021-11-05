export interface HistoryMeasurementsData {
  at: string;
  oilTemp?: number;
  waterTemp?: number;
  injValveOpen?: number;
  flareTemp?: number;
  tubingPressure?: number;
  casingPressure?: number;
}

export interface LatestMeasurementData {
  oilTemp?: number;
  waterTemp?: number;
  injValveOpen?: number;
  flareTemp?: number;
  tubingPressure?: number;
  casingPressure?: number;
}

export interface SelectedMetricData {
  oilTemp: boolean;
  waterTemp: boolean;
  injValveOpen: boolean;
  flareTemp: boolean;
  tubingPressure: boolean;
  casingPressure: boolean;
}
