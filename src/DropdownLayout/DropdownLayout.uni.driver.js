import {
  baseUniDriverFactory,
  ReactBase,
  findByHook,
} from '../../test/utils/unidriver';
import {
  DATA_OPTION,
  DATA_HOOKS,
  DATA_DIRECTION,
  DATA_SHOWN,
  DROPDOWN_LAYOUT_DIRECTIONS,
  OPTION_DATA_HOOKS,
} from './DataAttr';

import { listItemSelectDriverFactory } from '../ListItemSelect/ListItemSelect.uni.driver';

export const dropdownLayoutDriverFactory = base => {
  const reactBase = ReactBase(base);
  const contentContainer = () => findByHook(base, DATA_HOOKS.CONTENT_CONTAINER);
  const infiniteScrollContainer = () =>
    findByHook(base, DATA_HOOKS.INFINITE_SCROLL_CONTAINER);
  const optionsElement = () =>
    findByHook(base, DATA_HOOKS.DROPDOWN_LAYOUT_OPTIONS);

  async function getOptionsContainerDataHook() {
    return (await infiniteScrollContainer().exists())
      ? DATA_HOOKS.INFINITE_SCROLL_CONTAINER
      : DATA_HOOKS.DROPDOWN_LAYOUT_OPTIONS;
  }

  const optionElementAt = async position =>
    await base.$(
      `[data-hook=${await getOptionsContainerDataHook()}] > *:nth-child(${position +
        1})`,
    );

  const optionElementByDataHook = async dataHook =>
    await base.$(
      `[data-hook=${await getOptionsContainerDataHook()}] [data-hook="${dataHook}"]`,
    );
  const options = () =>
    base
      .$$(`[data-hook=${DATA_HOOKS.DROPDOWN_LAYOUT_OPTIONS}] > *`)
      .map(i => i);
  const optionsLength = async () => (await options()).length;
  const doIfOptionExists = (position, onSuccess) => {
    if (optionsLength() <= position) {
      throw new Error(
        `index out of bounds, try to get option ${position} while only ${optionsLength()} options exists`,
      );
    }
    return onSuccess();
  };
  const getOptionDriver = position =>
    doIfOptionExists(position, async () =>
      createOptionDriver(await optionElementAt(position)),
    );
  return {
    ...baseUniDriverFactory(base),
    /** @deprecated should be private */
    classes: () => optionsElement()._prop('className'),

    /** Clicks on an option at a specific index
     * @param {number} option index
     * @return {Promise<void>}
     */
    clickAtOption: async index => (await optionElementAt(index)).click(),

    /** Clicks on an option with a specific dataHook
     * @param {string} dataHook
     * @return {Promise<void>}
     */
    clickAtOptionByDataHook: async dataHook =>
      (await optionElementByDataHook(dataHook)).click(),

    /** Clicks on an option with a specific value
     * @param {string} value
     * @return {Promise<void>}
     */
    clickAtOptionWithValue: async value => {
      for (const _option of await options()) {
        const selectableOption = listItemSelectDriverFactory(_option);
        if ((await selectableOption.getTitle()) === value) {
          return _option.click();
        }
      }
    },

    /** @deprecated deprecated prop */
    hasTopArrow: async () =>
      await (await findByHook(base, DATA_HOOKS.TOP_ARROW)).exists(),

    /** @deprecated deprecated prop */
    isDown: async () =>
      (await (await contentContainer()).attr(DATA_DIRECTION)) ===
      DROPDOWN_LAYOUT_DIRECTIONS.DOWN,

    /** @deprecated deprecated prop */
    isUp: async () =>
      (await (await contentContainer()).attr(DATA_DIRECTION)) ===
      DROPDOWN_LAYOUT_DIRECTIONS.UP,

    isLinkOption: async position => {
      const option = await optionElementAt(position);
      return (await option._prop('tagName')).toLowerCase() === 'a';
    },

    isOptionADivider: position =>
      doIfOptionExists(position, async () => {
        const option = await optionElementAt(position);
        const divider = await findByHook(option, OPTION_DATA_HOOKS.DIVIDER);
        return divider.exists();
      }),

    isOptionExists: async optionText => {
      for (const _option of await options()) {
        if ((await _option.text()) === optionText) {
          return true;
        }
      }
      return false;
    },
    isOptionHovered: async index => {
      const option = await optionElementAt(index);
      return !!(await option.attr(DATA_OPTION.HOVERED));
    },
    isOptionSelected: async index => {
      const option = await optionElementAt(index);
      return !!(await option.attr(DATA_OPTION.SELECTED));
    },
    isOptionSelectedWithGlobalClassName: position =>
      doIfOptionExists(
        position,
        async () =>
          !!(await (await optionElementAt(position)).attr(
            DATA_OPTION.SELECTED_GLOBAL,
          )),
      ),
    isOptionHoveredWithGlobalClassName: position =>
      doIfOptionExists(
        position,
        async () =>
          !!(await (await optionElementAt(position)).attr(
            DATA_OPTION.HOVERED_GLOBAL,
          )),
      ),
    /** @deprecated */
    isOptionHeightSmall: position =>
      doIfOptionExists(
        position,
        async () =>
          (await (await optionElementAt(position)).attr(DATA_OPTION.SIZE)) ===
          'small',
      ),
    /** @deprecated */
    isOptionHeightBig: position =>
      doIfOptionExists(
        position,
        async () =>
          (await (await optionElementAt(position)).attr(DATA_OPTION.SIZE)) ===
          'big',
      ),
    isShown: async () => !!(await (await contentContainer()).attr(DATA_SHOWN)),
    mouseEnter: () => base.hover(),
    mouseEnterAtOption: position =>
      doIfOptionExists(position, async () =>
        (await optionElementAt(position)).hover(),
      ),
    mouseLeave: () => reactBase.mouseLeave(),
    /** @deprecated deprecated prop */
    mouseClickOutside: () => ReactBase.clickBody(),
    mouseLeaveAtOption: position =>
      doIfOptionExists(position, async () =>
        ReactBase(await optionElementAt(position)).mouseLeave(),
      ),
    /** @deprecated Use optionDriver*/
    optionAt: () => optionElementAt.getNative(), // eslint-disable-line no-restricted-properties
    /** @deprecated This should be a private method since the hook include internal parts ('dropdown-divider-{id}, dropdown-item-{id})') */
    optionByHook: async hook => {
      const option = optionsElement().$(`[data-hook=${hook}]`);
      if (!(await option.exists())) {
        throw new Error(`an option with data-hook ${hook} was not found`);
      }

      return createOptionDriver(option);
    },
    /**
     * Get Option by id
     * @returns {Promise<any>}
     */
    optionById(optionId) {
      return this.optionByHook(`dropdown-item-${optionId}`);
    },
    optionContentAt: position =>
      doIfOptionExists(position, async () =>
        (await optionElementAt(position)).text(),
      ),
    optionDriver: createOptionDriver,
    options: async () => {
      const drivers = [];
      for (let position = 0; position < (await optionsLength()); position++) {
        drivers.push(await getOptionDriver(position));
      }
      return drivers;
    },
    optionsContent: async () => {
      const textArray = [];
      for (const option of await options()) {
        textArray.push(await option.text());
      }
      return textArray;
    },
    markedOption: async () => {
      const allOptions = await options();
      const optionsWithHovered = await Promise.all(
        allOptions.map(async option => ({
          option,
          hovered: !!(await option.attr(DATA_OPTION.HOVERED)),
        })),
      );
      const hoveredOptions = optionsWithHovered
        .filter(option => option.hovered)
        .map(option => option.option);
      return (
        (hoveredOptions.length &&
          createOptionDriver(hoveredOptions[0]).content()) ||
        null
      );
    },
    optionsLength,
    /** @deprecated should be private */
    optionsScrollTop: () => optionsElement()._prop('scrollTop'),
    pressDownKey: () => base.pressKey('ArrowDown'),
    pressUpKey: () => base.pressKey('ArrowUp'),
    pressEnterKey: () => base.pressKey('Enter'),
    pressSpaceKey: () => base.pressKey(' '),
    pressTabKey: () => base.pressKey('Tab'),
    pressEscKey: () => base.pressKey('Escape'),
    tabIndex: () => base._prop('tabIndex'),
  };
};

const createOptionDriver = option => ({
  element: () => option,
  mouseEnter: () => option.hover(),
  mouseLeave: () => ReactBase(option).mouseLeave(),
  isHovered: async () => !!(await option.attr(DATA_OPTION.HOVERED)),
  isSelected: async () => !!(await option.attr(DATA_OPTION.SELECTED)),
  content: () => option.text(),
  click: () => option.click(),
  isDivider: async () => {
    const divider = await findByHook(option, OPTION_DATA_HOOKS.DIVIDER);
    return divider.exists();
  },
  isDisabled: async () => !!(await option.attr(DATA_OPTION.DISABLED)),
});
