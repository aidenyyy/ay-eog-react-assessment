import { gql } from '@apollo/client';

export const subscriptionQuery = gql`
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;
