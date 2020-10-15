import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import FontUpgrade from '../FontUpgrade';
import { FontUpgradePrivateDriverFactory } from './FontUpgrade.private.uni.driver';
import { FontUpgradeContext } from '../context';

describe('FontUpgrade', () => {
  const render = createRendererWithUniDriver(FontUpgradePrivateDriverFactory);

  afterEach(cleanup);

  it('should be active', async () => {
    const text = 'text';
    const { driver } = render(
      <FontUpgrade>
        <div id="wrapper">
          <FontUpgradeContext.Consumer>
            {({ active }) => {
              return <div data-active={active ? 'active' : null}>{text}</div>;
            }}
          </FontUpgradeContext.Consumer>
        </div>
      </FontUpgrade>,
    );

    expect(await driver.getElement('[data-active=active]').exists()).toBe(true);
    expect(await driver.getElement('[data-active=active]').text()).toContain(
      text,
    );
  });

  it('should not be active', async () => {
    const text = 'text';
    const { driver } = render(
      <div id="wrapper">
        <FontUpgradeContext.Consumer>
          {({ active }) => {
            return <div data-active={active ? 'active' : null}>{text}</div>;
          }}
        </FontUpgradeContext.Consumer>
      </div>,
    );

    expect(await driver.getElement('[data-active=active]').exists()).toBe(
      false,
    );
  });

  it('should have className', async () => {
    const className = 'some-class-name';
    const { driver } = render(<FontUpgrade className={className} />);
    expect((await driver.element()).className).toContain(className);
  });

  it.each(['span', 'div'])('should be a %p element', async element => {
    const { driver } = render(<FontUpgrade as={element} />);
    expect((await driver.element()).tagName).toBe(element.toUpperCase());
  });

  it('should return true if active', async () => {
    const { driver } = render(<FontUpgrade active />);
    expect(await driver.isActive()).toBe(true);
  });

  it('should return false if not active', async () => {
    const { driver } = render(<FontUpgrade active={false} />);
    expect(await driver.isActive()).toBe(false);
  });
});
