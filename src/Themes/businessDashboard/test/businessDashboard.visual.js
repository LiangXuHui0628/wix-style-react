import React from 'react';
import ThemeProvider from '../../../ThemeProvider';
import businessDashboardTheme from '../BusinessDashboard';
import { buttonTests as ButtonTests } from '../../../Button/test/Button.visual';
import { carouselTests as CarouselTests } from '../../../Carousel/test/Carousel.visual';
import { circularProgressBarTests as CircularProgressBarTests } from '../../../CircularProgressBar/test/CircularProgressBar.visual';

const themeName = 'BusinessDashboard';
const testWithTheme = test => {
  return (
    <ThemeProvider theme={businessDashboardTheme()}>
      <>{test}</>
    </ThemeProvider>
  );
};

ButtonTests({ themeName, testWithTheme });
CarouselTests({ themeName, testWithTheme });
CircularProgressBarTests({ themeName, testWithTheme });
