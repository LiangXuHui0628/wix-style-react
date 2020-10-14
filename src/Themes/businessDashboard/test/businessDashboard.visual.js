import React from 'react';
import businessDashboardTheme from '../BusinessDashboard';
import { buttonTests as ButtonTests } from '../../../Button/test/Button.visual';
import { circularProgressBarTests as CircularProgressBarTests } from '../../../CircularProgressBar/test/CircularProgressBar.visual';
import { ThemeProvider } from '../../..';

const themeName = 'BusinessDashboard';
const testWithTheme = test => {
  return (
    <ThemeProvider theme={businessDashboardTheme()}>
      <>{test}</>
    </ThemeProvider>
  );
};

ButtonTests({ themeName, testWithTheme });
CircularProgressBarTests({ themeName, testWithTheme });
