import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedMetrics } from '../../store/actions';

const useStyles = makeStyles({
  container: {
    width: '40%',
    padding: '15px',
  },
});

const query = gql`
  query {
    getMetrics
  }
`;

type GetMetricsData = {
  getMetrics: string[];
};

const Dropdown = () => {
  const dispatch = useDispatch();

  const [metricSelections, setMetricSelections] = useState([] as string[]);

  const styles = useStyles();

  const { loading, data } = useQuery<GetMetricsData>(query, {});

  useEffect(() => {
    if (!loading && data) {
      setMetricSelections(data.getMetrics);
    }
  }, [loading, data]);

  const handleChange = (_: ChangeEvent<{}>, value: any) => {
    const metric: string[] = Object.values(value);
    dispatch(setSelectedMetrics(metric));
  };

  return (
    <div className={styles.container}>
      <Autocomplete
        multiple
        options={metricSelections}
        onChange={handleChange}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} variant="standard" label="Select data" placeholder="Options..." />
        )}
      />
    </div>
  );
};

export default Dropdown;
