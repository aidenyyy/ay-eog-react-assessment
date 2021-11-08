import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

interface Props {
  name: string;
  value: number;
}

const MetricCard = ({ name, value }: Props) => (
  <Card style={{ marginLeft: '1rem', marginBottom: '1rem', width: '150px' }}>
    <CardContent>
      <Typography>{name}</Typography>
      <Typography>{value}</Typography>
    </CardContent>
  </Card>
);

export default MetricCard;
