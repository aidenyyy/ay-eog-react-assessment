import React, { FC } from 'react';
import { Chart } from './Chart';
import { Dropdown } from './Dropdown';

const Dashboard: FC = () => (
  <div className="dashboard">
    <div>
      <Dropdown />
    </div>
    <Chart />
  </div>
);

export default Dashboard;
