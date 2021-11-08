import React, { FC } from 'react';
import { Chart } from './Chart';
import { Dropdown } from './Dropdown';
import { MetricCard } from './MetricCard';

const Dashboard: FC = () => (
  <div className="dashboard">
    <div style={{ display: 'flex' }}>
      <Dropdown />
      <MetricCard />
    </div>
    <Chart />
  </div>
);

export default Dashboard;
