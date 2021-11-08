import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { MetricEnum } from '../../type';
import MetricCard from './MetricCard';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px',
    width: '50%',
  },
});

export default () => {
  const selectedMetrics = useSelector((state: IState) => state.selectedMetrics);
  const latestData = useSelector((state: IState) => state.latestData);

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {selectedMetrics.map((metric, idx) => {
        const currentLatestData = latestData[metric as MetricEnum];
        // eslint-disable-next-line react/no-array-index-key
        return currentLatestData !== undefined && <MetricCard key={idx} name={metric} value={currentLatestData} />;
      })}
    </div>
  );
};
