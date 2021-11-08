import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setHistoryMeasurements } from '../../store/actions';
import { MultipleMeasurementsDataResponse } from '../../type';
import { IState } from '../../store';

const time = Date.now();

const input = (before: number) => [
  {
    metricName: 'oilTemp',
    after: before - 90 * 60000,
    before,
  },
  {
    metricName: 'waterTemp',
    after: before - 90 * 60000,
    before,
  },
  {
    metricName: 'injValveOpen',
    after: before - 90 * 60000,
    before,
  },
  {
    metricName: 'flareTemp',
    after: before - 90 * 60000,
    before,
  },
  {
    metricName: 'tubingPressure',
    after: before - 90 * 60000,
    before,
  },
  {
    metricName: 'casingPressure',
    after: before - 90 * 60000,
    before,
  },
];

const getAllMeasurements = gql`
  query ($input: [MeasurementQuery]!) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        metric
        at
        value
        unit
      }
    }
  }
`;

const useCustomQuery = () => {
  const dispatch = useDispatch();

  const { loading: queryLoading, data: queryData } = useQuery<MultipleMeasurementsDataResponse>(getAllMeasurements, {
    variables: {
      input: input(time),
    },
  });

  useEffect(() => {
    if (!queryLoading && queryData) {
      dispatch(setHistoryMeasurements(queryData));
    }
  }, [queryData]);

  const chartData = useSelector((state: IState) => state.historyData);

  return chartData.length > 0;
};

export default useCustomQuery;
