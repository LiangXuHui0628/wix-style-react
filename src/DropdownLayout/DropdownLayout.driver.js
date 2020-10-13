import ReactTestUtils from 'react-dom/test-utils';
import values from '../utils/operators/values';
import {
  DATA_HOOKS,
  DATA_OPTION,
  DATA_SHOWN,
  DATA_DIRECTION,
  DROPDOWN_LAYOUT_DIRECTIONS,
  OPTION_DATA_HOOKS,
} from './DataAttr';

const dropdownLayoutDriverFactory = ({ element }) => {
  const byDataHook = dataHook =>
    element.querySelector(`[data-hook="${dataHook}"]`);

  const contentContainer = byDataHook(DATA_HOOKS.CONTENT_CONTAINER);

  const infiniteScrollContainer = byDataHook(
    DATA_HOOKS.INFINITE_SCROLL_CONTAINER,
  );

  const optionElementsContainer = byDataHook(
    DATA_HOOKS.DROPDOWN_LAYOUT_OPTIONS,
  );

  const optionElements = infiniteScrollContainer
    ? infiniteScrollContainer
    : optionElementsContainer;

  const optionElementAt = position => optionElements.childNodes[position];
  const optionsLength = () => optionElements.childNodes.length;
  const doIfOptionExists = (position, onSuccess) => {
    if (optionsLength() <= position) {
      throw new Error(
        `index out of bounds, try to get option ${position} while only ${optionsLength()} options exists`,
      );
    }
    return onSuccess();
  };
  const getOptionDriver = position =>
    doIfOptionExists(position, () =>
      createOptionDriver(optionElementAt(position)),
    );

  return {
    classes: () => optionElementsContainer.className,
    clickAtOption: position =>
      doIfOptionExists(position, () =>
        ReactTestUtils.Simulate.click(optionElementAt(position)),
      ),
    clickAtOptionWithValue: value => {
      const option = values(optionElements.childNodes).find(
        _option => _option.textContent === value,
      );
      option && ReactTestUtils.Simulate.click(option);
    },
    exists: () => !!element,
    hasTopArrow: () =>
      !!element.querySelector(`[data-hook="${DATA_HOOKS.TOP_ARROW}"]`),
    isDown: () =>
      contentContainer.getAttribute(DATA_DIRECTION) ===
      DROPDOWN_LAYOUT_DIRECTIONS.DOWN,
    isLinkOption: position =>
      optionElementAt(position).tagName.toLowerCase() === 'a',
    isOptionADivider: position =>
      doIfOptionExists(position, () => {
        const option = optionElementAt(position);
        const divider = option.querySelector(
          `[data-hook="${OPTION_DATA_HOOKS.DIVIDER}"]`,
        );
        return !!divider;
      }),
    isOptionExists: optionText =>
      [].filter.call(
        optionElements.childNodes,
        opt => opt.textContent === optionText,
      ).length > 0,
    /** returns if an option is hovered. notice that it checks by index and __not__ by id */
    isOptionHovered: position =>
      doIfOptionExists(position, () =>
        optionElementAt(position).hasAttribute(DATA_OPTION.HOVERED),
      ),
    isOptionSelected: position =>
      doIfOptionExists(position, () =>
        optionElementAt(position).hasAttribute(DATA_OPTION.SELECTED),
      ),
    isOptionHoveredWithGlobalClassName: position =>
      doIfOptionExists(position, () =>
        optionElementAt(position).hasAttribute(DATA_OPTION.HOVERED_GLOBAL),
      ),
    isOptionSelectedWithGlobalClassName: position =>
      doIfOptionExists(position, () =>
        optionElementAt(position).hasAttribute(DATA_OPTION.SELECTED_GLOBAL),
      ),
    isOptionHeightSmall: position =>
      doIfOptionExists(
        position,
        () =>
          optionElementAt(position).getAttribute(DATA_OPTION.SIZE) === 'small',
      ),
    isOptionHeightBig: position =>
      doIfOptionExists(
        position,
        () =>
          optionElementAt(position).getAttribute(DATA_OPTION.SIZE) === 'big',
      ),
    isShown: () => contentContainer.hasAttribute(DATA_SHOWN),
    isUp: () =>
      contentContainer.getAttribute(DATA_DIRECTION) ===
      DROPDOWN_LAYOUT_DIRECTIONS.UP,
    mouseClickOutside: () =>
      document.body.dispatchEvent(
        new Event('mouseup', { cancelable: true, bubbles: true }),
      ),
    mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(element),
    mouseEnterAtOption: position =>
      doIfOptionExists(position, () =>
        ReactTestUtils.Simulate.mouseEnter(optionElementAt(position)),
      ),
    mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(element),
    mouseLeaveAtOption: position =>
      doIfOptionExists(position, () =>
        ReactTestUtils.Simulate.mouseLeave(optionElementAt(position)),
      ),
    /** @deprecated Use optionDriver*/
    optionAt: optionElementAt,
    /** @deprecated This should be a private method since the hook include internal parts ('dropdown-divider-{id}, dropdown-item-{id})') */
    optionByHook: hook => {
      const option = optionElements.querySelector(`[data-hook=${hook}]`);
      if (!option) {
        throw new Error(`an option with data-hook ${hook} was not found`);
      }
      return createOptionDriver(option);
    },
    optionById(optionId) {
      return this.optionByHook(`dropdown-item-${optionId}`);
    },
    optionContentAt: position =>
      doIfOptionExists(position, () => optionElementAt(position).textContent),
    /** Get option driver given an option index */
    optionDriver: createOptionDriver,
    /** Get an array of all options including dividers (drivers) */
    options: () => {
      const drivers = [];
      for (let position = 0; position < optionsLength(); position++) {
        drivers.push(getOptionDriver(position));
      }
      return drivers;
    },
    optionsContent: () =>
      values(optionElements.childNodes).map(option => option.textContent),

    markedOption: async () => {
      const hoveredOption = optionElements.querySelector(
        `[${DATA_OPTION.HOVERED}="true"]`,
      );
      return (
        (hoveredOption && createOptionDriver(hoveredOption).content()) || null
      );
    },

    optionsLength: () => optionsLength(),
    /** @deprecated should be private */
    optionsScrollTop: () => optionElements.scrollTop,
    pressDownKey: () =>
      ReactTestUtils.Simulate.keyDown(element, { key: 'ArrowDown' }),
    pressUpKey: () =>
      ReactTestUtils.Simulate.keyDown(element, { key: 'ArrowUp' }),
    pressEnterKey: () =>
      ReactTestUtils.Simulate.keyDown(element, { key: 'Enter' }),
    pressSpaceKey: () => ReactTestUtils.Simulate.keyDown(element, { key: ' ' }),
    pressTabKey: () => ReactTestUtils.Simulate.keyDown(element, { key: 'Tab' }),
    pressEscKey: () =>
      ReactTestUtils.Simulate.keyDown(element, { key: 'Escape' }),
    tabIndex: () => element.tabIndex,
  };
};

const createOptionDriver = option => ({
  element: () => option,
  mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(option),
  mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(option),
  isHovered: () => option.hasAttribute(DATA_OPTION.HOVERED),
  isSelected: () => option.hasAttribute(DATA_OPTION.SELECTED),
  content: () => option.textContent,
  click: () => ReactTestUtils.Simulate.click(option),
  isDivider: () => {
    const divider = option.querySelector(
      `[data-hook="${OPTION_DATA_HOOKS.DIVIDER}"]`,
    );
    return !!divider;
  },
  isDisabled: () => option.hasAttribute(DATA_OPTION.DISABLED),
});

export default dropdownLayoutDriverFactory;
