import React from 'react';
import businessDashboardTheme from '../BusinessDashboard';
import { buttonTests as ButtonTests } from '../../../Button/test/Button.visual';
import { circularProgressBarTests as CircularProgressBarTests } from '../../../CircularProgressBar/test/CircularProgressBar.visual';
import BusinessDashboardThemeProvider from '.';

const themeName = 'BusinessDashboard';
const testWithTheme = test => {
  return (
    <BusinessDashboardThemeProvider theme={businessDashboardTheme()}>
      <>{test}</>
    </BusinessDashboardThemeProvider>
  );
};

ButtonTests({ themeName, testWithTheme });
CircularProgressBarTests({ themeName, testWithTheme });
