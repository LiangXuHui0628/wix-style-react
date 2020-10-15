import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  divider,
  example as baseExample,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import { storySettings } from './storySettings';
import { businessDashboardComponents } from '../../../../stories/utils/allComponents';
import SectionHelper from '../../../SectionHelper';
import * as carousel from './components/Carousel';
import * as buttons from './components/Button';
import * as circularProgressBar from './components/CircularProgressBar';
import { Category } from '../../../../stories/storiesHierarchy';
import Box from '../../../Box';
import Text from '../../../Text';

const example = config =>
  baseExample({ components: businessDashboardComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: () => null,

  sections: [
    header({
      sourceUrl: `https://github.com/wix/wix-style-react/tree/master/src/Themes/businessDashboard/`,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            text: (
              <SectionHelper title="WARNING">
                Do not use this theme unless you've been instructed to
              </SectionHelper>
            ),
          }),

          description({
            title: 'Description',
            text: `
            This theme provides the flavor of the new Business manager dashboard design on top of wix-style-react components.
            Important: This is an experimental theme which might change, so do not use it unless you've been instructed to`,
          }),

          importExample(`
import { ThemeProvider } from 'wix-style-react';
import { theme } from 'wix-style-react/themes/businessDashboard';

() => (
  <ThemeProvider theme={theme({ active: true })}>
    ...
  </ThemeProvider>
);
          `),
          divider(),
          title('Playground'),
          example({
            text: TextComponent('Button'),
            source: buttons.playground,
          }),
          example({
            text: TextComponent('Carousel'),
            source: carousel.playground,
          }),
          example({
            text: TextComponent('CircularProgressBar'),
            source: circularProgressBar.playground,
          }),
        ],
      }),
    ]),
  ],
};

export function TextComponent(componentName) {
  return (
    <Box direction="horizontal" verticalAlign="middle" breakInside>
      <Box marginRight="SP1">
        <Text>Based&nbsp;on</Text>
      </Box>
      <Box marginRight="SP1">
        <LinkTo kind={Category.COMPONENTS} story={componentName}>
          {componentName}
        </LinkTo>
      </Box>
    </Box>
  );
}
