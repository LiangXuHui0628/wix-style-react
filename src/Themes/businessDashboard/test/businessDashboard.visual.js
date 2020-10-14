import React from 'react';
import businessDashboardTheme from '../BusinessDashboard';
import { runTests as ButtonTests } from '../../../Button/test/Button.visual';
import { runTests as CircularProgressBarTests } from '../../../CircularProgressBar/test/CircularProgressBar.visual';
import { ThemeProvider } from '../../..';

const themeName = 'Business Dashboard';
const testWithTheme = test => {
  return (
    <ThemeProvider theme={businessDashboardTheme()}>
      <>{test}</>
    </ThemeProvider>
  );
};

ButtonTests({ themeName, testWithTheme });
CircularProgressBarTests({ themeName, testWithTheme });
