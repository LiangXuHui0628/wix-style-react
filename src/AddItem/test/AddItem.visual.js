import React from 'react';
import { storiesOf } from '@storybook/react';
import AddItem from '../index';
import { Cell, Layout } from '../../Layout';
import Box from '../../Box';

const defaultProps = {
  label: 'String',
  value: 'Add New Item',
};

const tests = [
  {
    describe: 'alignItems',
    its: [
      {
        it: 'center',
        props: {
          alignItems: 'center',
        },
      },
      {
        it: 'right',
        props: {
          alignItems: 'right',
        },
      },
      {
        it: 'left',
        props: {
          alignItems: 'left',
        },
      },
    ],
  },
  {
    describe: 'theme',
    its: [
      {
        it: 'dashes',
        props: { theme: 'dashes' },
      },
      {
        it: 'plain',
        props: { theme: 'plain' },
      },
      {
        it: 'filled',
        props: { theme: 'filled' },
      },
      {
        it: 'image',
        props: { theme: 'image' },
      },
    ],
  },
  {
    describe: 'disabled theme',
    its: [
      {
        it: 'dashes',
        props: { disabled: true, theme: 'dashes' },
      },
      {
        it: 'plain',
        props: { disabled: true, theme: 'plain' },
      },
      {
        it: 'filled',
        props: { disabled: true, theme: 'filled' },
      },
      {
        it: 'image',
        props: { disabled: true, theme: 'image' },
      },
    ],
  },
  {
    describe: 'size',
    its: [
      {
        it: 'tiny',
        props: { size: 'tiny' },
      },
      {
        it: 'small',
        props: { size: 'small' },
      },
      {
        it: 'medium',
        props: { size: 'medium' },
      },
      {
        it: 'large',
        props: { size: 'large' },
      },
    ],
  },
  {
    describe: 'showIcon',
    its: [
      {
        it: 'showIcon false',
        props: { showIcon: false },
      },
    ],
  },
  {
    describe: 'removePadding',
    its: [
      {
        it: 'removePadding true',
        props: { removePadding: true },
      },
    ],
  },
  {
    describe: 'children',
    its: [
      {
        it: 'as a string',
        props: { children: 'AddItem' },
      },
      {
        it: 'as a node',
        props: { children: <Box marginLeft="SP1">A node with marginLeft</Box> },
      },
      {
        it: 'as a render function',
        props: {
          children: () => (
            <div style={{ fontSize: '20px', color: 'blue' }}>
              Text styles should not be applied!
            </div>
          ),
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`AddItem${describe ? '/' + describe : ''}`, module).add(
      it,
      () => <AddItem {...defaultProps} {...props} />,
    );
  });
});

storiesOf('AddItem/borderRadius', module).add('borderRadius 100%', () => (
  <Layout>
    <Cell>
      <div style={{ height: '40px', width: '40px' }}>
        <AddItem size="tiny" removePadding borderRadius="100%" />
      </div>
    </Cell>
    <Cell>
      <div style={{ height: '80px', width: '80px' }}>
        <AddItem size="small" removePadding borderRadius="100%" />
      </div>
    </Cell>
    <Cell>
      <div style={{ height: '120px', width: '120px' }}>
        <AddItem size="medium" removePadding borderRadius="100%" />
      </div>
    </Cell>
    <Cell>
      <div style={{ height: '160px', width: '160px' }}>
        <AddItem size="large" removePadding borderRadius="100%" />
      </div>
    </Cell>
  </Layout>
));
