import React from 'react';
import { storiesOf } from '@storybook/react';
import ListItemSection, { listItemSectionBuilder } from '../ListItemSection';
import DropdownLayout from '../../DropdownLayout';
import Box from '../../Box';

const commonProps = {
  title: 'I am a list section',
};

const tests = [
  {
    describe: '',
    its: [
      {
        it: 'text',
        props: {},
      },
      {
        it: 'text with suffix',
        props: {
          suffix: 'I am a suffix',
        },
      },
      {
        it: 'text with suffix node',
        props: {
          suffix: <span style={{ color: 'red' }}>suffix node</span>,
        },
      },
      {
        it: 'subheader',
        props: {
          type: 'subheader',
        },
      },
      {
        it: 'subheader with suffix',
        props: {
          type: 'subheader',
          suffix: 'I am a suffix',
        },
      },
      {
        it: 'subheader with suffix node',
        props: {
          type: 'subheader',
          suffix: <span style={{ color: 'red' }}>suffix node</span>,
        },
      },
      {
        it: 'whitespace',
        props: {
          type: 'whitespace',
        },
      },
      {
        it: 'divider',
        props: {
          type: 'divider',
        },
      },
    ],
  },
  {
    describe: 'ellipsis',
    its: [
      {
        it: 'only text',
        props: {
          title:
            'This is a very long title which exceeds the maximum width of its container',
        },
      },
      {
        it: 'with suffix',
        props: {
          title:
            'This is a very long title which exceeds the maximum width of its container',
          suffix:
            'This is a very long suffix which exceeds the maximum width of its container',
        },
      },
      {
        it: 'ellipsis - only text',
        props: {
          title:
            'This is a very long title which exceeds the maximum width of its container',
          ellipsis: true,
        },
      },
      {
        it: 'ellipsis - with suffix',
        props: {
          title:
            'This is a very long title which exceeds the maximum width of its container',
          ellipsis: true,
          suffix:
            'This is a very long suffix which exceeds the maximum width of its container',
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`ListItemSection${describe ? '/' + describe : ''}`, module).add(
      it,
      () => (
        <Box width="400px">
          <ListItemSection {...commonProps} {...props} />
        </Box>
      ),
    );
  });
});

storiesOf('ListItemSection', module).add('builder', () => (
  <DropdownLayout
    visible
    options={[
      listItemSectionBuilder({
        id: 0,
        title: 'option 1',
        type: 'title',
      }),
      listItemSectionBuilder({
        id: 1,
        title: 'option 2',
        type: 'subheader',
      }),
      listItemSectionBuilder({
        id: 2,
        type: 'whitespace',
      }),
      listItemSectionBuilder({
        id: 3,
        type: 'divider',
      }),
      listItemSectionBuilder({
        id: 4,
        type: 'whitespace',
      }),
    ]}
  />
));
