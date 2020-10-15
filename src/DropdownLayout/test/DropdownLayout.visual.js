import React from 'react';
import { storiesOf } from '@storybook/react';
import DropdownLayout from '../DropdownLayout';
import { RTLWrapper } from '../../../stories/utils/RTLWrapper';
import { storySettings } from './storySettings';
import { uniTestkitFactoryCreator } from 'wix-ui-test-utils/vanilla';
import { dropdownLayoutDriverFactory } from '../DropdownLayout.uni.driver';

const dropdownLayoutTestkitFactory = uniTestkitFactoryCreator(
  dropdownLayoutDriverFactory,
);

const { dataHook } = storySettings;

const createDriver = () =>
  dropdownLayoutTestkitFactory({
    wrapper: document.body,
    dataHook,
  });

const optionNodeStyle = { backgroundColor: 'pink' };

const nodeOptions = [
  { id: 0, value: <div style={optionNodeStyle}>Option 1</div> },
  { id: 1, value: <div style={optionNodeStyle}>Option 2</div> },
  { id: 2, value: <div style={optionNodeStyle}>Option 3</div> },
  { id: 3, value: <div style={optionNodeStyle}>Option 4</div> },
];

const commonProps = {
  options: [
    { id: 0, value: 'Option 1' },
    { id: 1, value: 'Option 2' },
    { id: 2, value: 'Option 3' },
    { id: 3, value: 'Option 4' },
  ],
  visible: true,
};

const setColor = ({ selected, hovered, disabled }) =>
  (selected && 'red') || (hovered && 'green') || (disabled && 'grey');

const customBuilderFunction = ({ id, disabled }) => ({
  id,
  disabled,
  value: props => <div style={{ color: setColor(props) }}>value</div>,
});

const fixedNodeStyles = {
  backgroundColor: 'red',
  padding: '10px',
};

const containerStyles = {
  width: '240px',
  lineHeight: '22px',
  border: '1px solid rgba(0, 0, 0, 0.6)',
  borderRadius: 6,
  overflow: 'auto',
  boxShadow: '0 0 6px rgba(0, 0, 0, 0.6)',
  padding: '6px 0',
  display: 'inline-block',
  margin: '0 20px ',
};

const booleanProps = [true, false];

const tests = [
  {
    describe: 'sanity',
    its: [
      {
        it: 'default',
        props: {},
      },
    ],
  },
  {
    describe: 'fixed node',
    its: [
      {
        it: 'fixedHeader',
        props: {
          fixedHeader: <div style={fixedNodeStyles}>I am a header</div>,
        },
      },
      {
        it: 'fixedFooter',
        props: {
          fixedFooter: <div style={fixedNodeStyles}>I am a footer</div>,
        },
      },
    ],
  },
  {
    describe: 'dropDirectionUp',
    its: booleanProps.map(value => ({
      it: value.toString(),
      props: { dropDirectionUp: value },
    })),
  },
  {
    describe: 'visible',
    its: booleanProps.map(value => ({
      it: value.toString(),
      props: { visible: value },
    })),
  },
  {
    describe: 'size',
    its: [
      {
        it: 'maxHeightPixels',
        props: { maxHeightPixels: 150 },
      },
      {
        it: 'minWidthPixels',
        props: { minWidthPixels: 200 },
      },
    ],
  },
  {
    describe: 'selectedId',
    its: [
      {
        it: 'selectedId',
        props: { selectedId: 0 },
      },
    ],
  },
  {
    describe: 'option',
    its: [
      {
        it: 'title',
        props: {
          options: [
            { id: 'first title', value: 'title', title: true },
            { id: 1, value: 'Option 1' },
            { id: 2, value: 'Option 2' },
          ],
        },
      },
      {
        it: 'disabled',
        props: {
          options: [
            { id: 'disabled', value: 'Disabled', disabled: true },
            { id: 1, value: 'Option 1' },
            { id: 2, value: 'Option 2' },
          ],
        },
      },
      {
        it: 'divider',
        props: {
          options: [
            { id: 1, value: 'Option 1' },
            { id: 2, value: '-' },
            { id: 3, value: 'Option 2' },
          ],
        },
      },
      /* backwards compatibility */
      {
        it: 'overrideStyle',
        props: {
          options: [
            { id: 1, value: 'Option 1', overrideStyle: true },
            {
              id: 2,
              value: <div style={{ color: 'red' }}>Option 2</div>,
              overrideStyle: true,
            },
            { id: 3, value: 'Option 1', overrideStyle: true, disabled: true },
            {
              id: 4,
              value: <div style={{ color: 'red' }}>Option 2</div>,
              overrideStyle: true,
              disabled: true,
            },
          ],
        },
      },
      {
        it: 'custom builder',
        props: {
          options: [
            customBuilderFunction({ id: 1 }),
            customBuilderFunction({ id: 2, disabled: true }),
            customBuilderFunction({ id: 3 }),
          ],
        },
      },
    ],
  },
  {
    describe: 'inContainer',
    its: [
      {
        it: 'default',
        props: { inContainer: true },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`DropdownLayout ${describe ? '/' + describe : ''}`, module).add(
      it,
      () => (
        <div style={{ margin: '160px 0' }}>
          <div
            className="first"
            style={
              props.inContainer
                ? containerStyles
                : { width: '240px', display: 'inline-block' }
            }
          >
            <DropdownLayout {...commonProps} {...props} />
          </div>
          <div
            className="second"
            style={
              props.inContainer
                ? containerStyles
                : { width: '240px', float: 'right', display: 'inline-block' }
            }
          >
            <RTLWrapper rtl>
              <DropdownLayout {...commonProps} {...props} />
            </RTLWrapper>
          </div>
        </div>
      ),
    );
  });
});

const interactiveTests = [
  {
    describe: 'option',
    its: [
      {
        it: 'custom builder on hover',
        props: {
          options: [
            customBuilderFunction({ id: 1 }),
            customBuilderFunction({ id: 2, disabled: true }),
            customBuilderFunction({ id: 3 }),
          ],
        },
        componentDidMount: async () => {
          const driver = createDriver();
          await driver.mouseEnterAtOption(0);
        },
      },
      {
        it: 'custom builder on click',
        props: {
          options: [
            customBuilderFunction({ id: 1 }),
            customBuilderFunction({ id: 2, disabled: true }),
            customBuilderFunction({ id: 3 }),
          ],
        },
        componentDidMount: async () => {
          const driver = createDriver();
          await driver.clickAtOption(0);
        },
      },
      {
        it: 'option on hover',
        props: {},
        componentDidMount: async () => {
          const driver = createDriver();
          await driver.mouseEnterAtOption(0);
        },
      },
      {
        it: 'option on click',
        props: {},
        componentDidMount: async () => {
          const driver = createDriver();
          await driver.clickAtOption(0);
        },
      },
      {
        it: 'option node on hover',
        props: {
          options: nodeOptions,
        },
        componentDidMount: async () => {
          const driver = createDriver();
          await driver.mouseEnterAtOption(0);
        },
      },
      {
        it: 'option node on click',
        props: {
          options: nodeOptions,
        },
        componentDidMount: async () => {
          const driver = createDriver();
          await driver.clickAtOption(0);
        },
      },
    ],
  },
];

class InteractiveDropdownLayout extends React.Component {
  async componentDidMount() {
    this.props.componentDidMount();
  }

  render() {
    return (
      <div style={{ margin: '160px 0' }}>
        <div style={{ width: '240px', display: 'inline-block' }}>
          <DropdownLayout
            dataHook={dataHook}
            {...commonProps}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

interactiveTests.forEach(({ describe, its }) => {
  its.forEach(({ it, props, componentDidMount }) => {
    storiesOf(
      `DropdownLayout ${describe ? '/' + describe : ''}`,
      module,
    ).add(it, () => (
      <InteractiveDropdownLayout
        {...props}
        componentDidMount={componentDidMount}
      />
    ));
  });
});
