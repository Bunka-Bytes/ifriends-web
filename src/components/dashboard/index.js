import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
// ------- STYLES -----
// ------- COMPONENTS -----

// Antd and Bootstrap

// Created
import BannerDashboard from './banner';

// ------ ICONS -----

// Services

// ------ FUNCTIONS ------

const Dashboard = () => {
  return (
    <Fragment>
      <BannerDashboard />
      <Outlet />
    </Fragment>
  )
};

export default Dashboard;
