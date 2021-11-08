import { gql, useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { updateMeasurement } from '../../store/actions';
import { MeasurementDataResponse } from '../../type';

const subscriptionQuery = gql`
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

const useSubscriptions = () => {
  const chartData = useSelector((state: IState) => state.historyData);

  const dispatch = useDispatch();

  const { data: subData } = useSubscription<MeasurementDataResponse>(subscriptionQuery, {
    variables: {},
  });

  useEffect(() => {
    if (subData && chartData.length > 0) {
      dispatch(updateMeasurement(subData));
    }
  }, [subData, chartData]);

  return chartData;
};

export default useSubscriptions;
