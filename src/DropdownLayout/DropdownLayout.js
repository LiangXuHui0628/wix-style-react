import PropTypes from 'prop-types';
import React from 'react';
import Loader from '../Loader/Loader';
import InfiniteScroll from '../utils/InfiniteScroll';
import scrollIntoView from '../utils/scrollIntoView';
import {
  DATA_HOOKS,
  DATA_OPTION,
  DATA_SHOWN,
  DATA_DIRECTION,
  DROPDOWN_LAYOUT_DIRECTIONS,
  OPTION_DATA_HOOKS,
  DROPDOWN_LAYOUT_LOADER,
} from './DataAttr';
import { st, classes } from './DropdownLayout.st.css';
import deprecationLog from '../utils/deprecationLog';
import { filterObject } from '../utils/filterObject';
import ReactDOM from 'react-dom';
import { listItemSectionBuilder } from '../ListItemSection';
import { listItemSelectBuilder } from '../ListItemSelect';
import { isString } from '../utils/StringUtils';

const MOUSE_EVENTS_SUPPORTED = ['mouseup', 'touchend'];

const modulu = (n, m) => {
  const remain = n % m;
  return remain >= 0 ? remain : remain + m;
};

const getUnit = value => (isString(value) ? value : `${value}px`);

const NOT_HOVERED_INDEX = -1;
export const DIVIDER_OPTION_VALUE = '-';

const deprecatedPropsLogs = props => {
  const deprecatedProps = [
    {
      propName: 'onClickOutside',
      deprecationMsg:
        '<DropdownLayout/> - onClickOutside prop is deprecated and will be removed soon, please use dropdown base instead.',
    },
    {
      propName: 'itemHeight',
      deprecationMsg:
        '<DropdownLayout/> - itemHeight prop is deprecated and will be removed in the next major release. In order to set a different height than 36px, please use a builder.',
    },
    {
      propName: 'withArrow',
      deprecationMsg:
        '<DropdownLayout/>- withArrow prop is deprecated and will be removed in the next major release, please use DropdownBase (with the prop "showArrow") or Popover component instead.',
    },
    {
      propName: 'dropDirectionUp',
      deprecationMsg:
        '<DropdownLayout/>- dropDirectionUp prop is deprecated and will be removed in the next major release, please use DropdownBase (with the prop "showArrow") or Popover component instead.',
    },
  ];

  deprecatedProps.forEach(({ propName, deprecationMsg }) => {
    if (props.hasOwnProperty(propName)) {
      deprecationLog(deprecationMsg);
    }
  });
};

class DropdownLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hovered: NOT_HOVERED_INDEX,
      selectedId: props.selectedId,
    };

    deprecatedPropsLogs(props);
  }

  componentDidMount() {
    if (this.props.focusOnSelectedOption) {
      this._focusOnSelectedOption();
    }
    this._markOptionByProperty(this.props);

    // Deprecated
    MOUSE_EVENTS_SUPPORTED.forEach(eventName => {
      document.addEventListener(eventName, this._onMouseEventsHandler, true);
    });

    this._boundEvents = MOUSE_EVENTS_SUPPORTED;
  }

  componentWillUnmount() {
    if (this._boundEvents && typeof document !== 'undefined') {
      this._boundEvents.forEach(eventName => {
        document.removeEventListener(
          eventName,
          this._onMouseEventsHandler,
          true,
        );
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this._markOption(NOT_HOVERED_INDEX);
    }

    if (this.props.selectedId !== nextProps.selectedId) {
      this.setState({ selectedId: nextProps.selectedId });
    }

    // make sure the same item is hovered if options changed
    if (
      this.state.hovered !== NOT_HOVERED_INDEX &&
      (!nextProps.options[this.state.hovered] ||
        this.props.options[this.state.hovered].id !==
          nextProps.options[this.state.hovered].id)
    ) {
      this._markOption(
        this._findIndex(
          nextProps.options,
          item => item.id === this.props.options[this.state.hovered].id,
        ),
      );
    }

    this._markOptionByProperty(nextProps);
  }

  // Deprecated
  _checkIfEventOnElements(e, elem) {
    let current = e.target;
    while (current.parentNode) {
      if (elem.indexOf(current) > -1) {
        return true;
      }
      current = current.parentNode;
    }

    return current !== document;
  }

  // Deprecated
  _onMouseEventsHandler = e => {
    if (!this._checkIfEventOnElements(e, [ReactDOM.findDOMNode(this)])) {
      this._onClickOutside(e);
    }
  };

  // Deprecated
  _renderTopArrow() {
    const { withArrow, visible } = this.props;

    return withArrow && visible ? (
      <div data-hook={DATA_HOOKS.TOP_ARROW} className={classes.arrow} />
    ) : null;
  }

  _patchOptionToBuilder({ option, idx }) {
    const { value, id, title: isTitle, disabled } = option;
    const { selectedId } = this.state;

    if (value === DIVIDER_OPTION_VALUE) {
      return listItemSectionBuilder({
        dataHook: OPTION_DATA_HOOKS.DIVIDER,
        id: id || idx,
        type: 'divider',
      });
    }

    if (isTitle) {
      return listItemSectionBuilder({
        dataHook: OPTION_DATA_HOOKS.TITLE,
        id,
        type: 'subheader',
        title: value,
      });
    }

    if (typeof value !== 'function') {
      return listItemSelectBuilder({
        dataHook: OPTION_DATA_HOOKS.SELECTABLE,
        id,
        title: value,
        disabled,
        selected: id === selectedId,
      });
    }

    // in case it's a render function
    return option;
  }

  _isControlled() {
    return (
      typeof this.props.selectedId !== 'undefined' &&
      typeof this.props.onSelect !== 'undefined'
    );
  }

  _focusOnSelectedOption() {
    if (this.selectedOption) {
      this.options.scrollTop = Math.max(
        this.selectedOption.offsetTop - this.selectedOption.offsetHeight,
        0,
      );
    }
  }

  _setSelectedOptionNode(optionNode, option) {
    if (option.id === this.state.selectedId) {
      this.selectedOption = optionNode;
    }
  }

  _onClickOutside = event => {
    const { visible, onClickOutside } = this.props;
    if (visible && onClickOutside) {
      onClickOutside(event);
    }
  };

  _markOption(index, options) {
    const { onOptionMarked } = this.props;
    options = options || this.props.options;

    this.setState({ hovered: index });
    onOptionMarked && onOptionMarked(options[index] || null);
  }

  _onSelect = (index, e) => {
    const { options, onSelect } = this.props;
    const chosenOption = options[index];

    if (chosenOption) {
      const sameOptionWasPicked = chosenOption.id === this.state.selectedId;
      if (onSelect) {
        e.stopPropagation();
        onSelect(chosenOption, sameOptionWasPicked);
      }
    }
    if (!this._isControlled()) {
      this.setState({ selectedId: chosenOption && chosenOption.id });
    }
    return !!onSelect && chosenOption;
  };

  _onMouseEnter = index => {
    if (this._isSelectableOption(this.props.options[index])) {
      this._markOption(index);
    }
  };

  _onMouseLeave = () => this._markOption(NOT_HOVERED_INDEX);

  _getMarkedIndex() {
    const { options } = this.props;
    const useHoverIndex = this.state.hovered > NOT_HOVERED_INDEX;
    const useSelectedIdIndex = typeof this.state.selectedId !== 'undefined';

    let markedIndex;
    if (useHoverIndex) {
      markedIndex = this.state.hovered;
    } else if (useSelectedIdIndex) {
      markedIndex = options.findIndex(
        option => option.id === this.state.selectedId,
      );
    } else {
      markedIndex = NOT_HOVERED_INDEX;
    }

    return markedIndex;
  }

  _markNextStep(step) {
    const { options } = this.props;

    if (!options.some(this._isSelectableOption)) {
      return;
    }

    let markedIndex = this._getMarkedIndex();

    do {
      markedIndex = Math.abs(
        modulu(Math.max(markedIndex + step, -1), options.length),
      );
    } while (!this._isSelectableOption(options[markedIndex]));
    this._markOption(markedIndex);
    const menuElement = this.options;
    const hoveredElement = this.props.infiniteScroll
      ? this.options.childNodes[0].childNodes[markedIndex]
      : this.options.childNodes[markedIndex];
    scrollIntoView(menuElement, hoveredElement);
  }

  /**
   * Handle keydown events for the DropdownLayout, mostly for accessibility
   *
   * @param {SyntheticEvent} event - The keydown event triggered by React
   * @returns {boolean} - Whether the event was handled by the component
   */
  _onKeyDown = event => {
    if (!this.props.visible || this.props.isComposing) {
      return false;
    }

    switch (event.key) {
      case 'ArrowDown': {
        this._markNextStep(1);
        event.preventDefault();
        break;
      }

      case 'ArrowUp': {
        this._markNextStep(-1);
        event.preventDefault();
        break;
      }

      case ' ':
      case 'Spacebar':
      case 'Enter': {
        if (!this._onSelect(this.state.hovered, event)) {
          return false;
        }
        break;
      }

      case 'Tab': {
        if (this.props.closeOnSelect) {
          return this._onSelect(this.state.hovered, event);
        } else {
          if (this._onSelect(this.state.hovered, event)) {
            event.preventDefault();
            return true;
          } else {
            return false;
          }
        }
        break;
      }

      case 'Escape': {
        this._onClose();
        break;
      }

      default: {
        return false;
      }
    }
    event.stopPropagation();
    return true;
  };

  _onClose = () => {
    this._markOption(NOT_HOVERED_INDEX);

    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  _renderNode(node) {
    return node ? <div>{node}</div> : null;
  }

  _wrapWithInfiniteScroll = scrollableElement => (
    <InfiniteScroll
      useWindow
      dataHook={DATA_HOOKS.INFINITE_SCROLL_CONTAINER}
      scrollElement={this.options}
      loadMore={this.props.loadMore}
      hasMore={this.props.hasMore}
      loader={
        <div className={classes.loader}>
          <Loader dataHook={DROPDOWN_LAYOUT_LOADER} size="small" />
        </div>
      }
    >
      {scrollableElement}
    </InfiniteScroll>
  );

  /** for testing purposes only */
  _getDataAttributes = () => {
    const { visible, dropDirectionUp } = this.props;

    return filterObject(
      {
        'data-hook': DATA_HOOKS.CONTENT_CONTAINER,
        [DATA_SHOWN]: visible,
        [DATA_DIRECTION]: dropDirectionUp
          ? DROPDOWN_LAYOUT_DIRECTIONS.UP
          : DROPDOWN_LAYOUT_DIRECTIONS.DOWN,
      },
      (key, value) => !!value,
    );
  };

  _renderOption({ option, idx }) {
    const builderOption = this._patchOptionToBuilder({ option, idx });

    const content = this._renderOptionContent({ builderOption, idx });

    return option.linkTo ? (
      <a
        className={classes.linkItem}
        key={idx}
        data-hook={DATA_HOOKS.LINK_ITEM}
        href={option.linkTo}
      >
        {content}
      </a>
    ) : (
      content
    );
  }

  // For testing purposes only
  _getItemDataAttr = ({ hovered, selected, disabled, overrideStyle }) => {
    const { itemHeight, selectedHighlight } = this.props;

    return filterObject(
      {
        [DATA_OPTION.HOVERED]: hovered || false,
        /* deprecated */
        [DATA_OPTION.SIZE]: itemHeight,
        [DATA_OPTION.DISABLED]: disabled,
        [DATA_OPTION.SELECTED]: selected && selectedHighlight,
        [DATA_OPTION.HOVERED_GLOBAL]: hovered && overrideStyle,
        [DATA_OPTION.SELECTED_GLOBAL]: selected && overrideStyle,
      },
      (key, value) => !!value,
    );
  };

  _renderOptionContent({ builderOption, idx }) {
    const { itemHeight, selectedHighlight } = this.props;
    const { selectedId, hovered } = this.state;

    const { id, disabled, overrideStyle } = builderOption;

    const optionState = {
      selected: id === selectedId,
      hovered: idx === hovered,
      disabled,
    };

    return (
      <div
        {...this._getItemDataAttr({ ...optionState, overrideStyle })}
        className={st(classes.option, {
          selected: optionState.selected && selectedHighlight,
          itemHeight,
          overrideStyle,
        })}
        ref={node => this._setSelectedOptionNode(node, builderOption)}
        onClick={!disabled ? e => this._onSelect(idx, e) : null}
        key={idx}
        onMouseEnter={() => this._onMouseEnter(idx)}
        onMouseLeave={this._onMouseLeave}
        data-hook={`dropdown-item-${id}`}
      >
        {builderOption.value(optionState)}
      </div>
    );
  }

  _markOptionByProperty(props) {
    if (this.state.hovered === NOT_HOVERED_INDEX && props.markedOption) {
      const selectableOptions = props.options.filter(this._isSelectableOption);
      if (selectableOptions.length) {
        const idToMark =
          props.markedOption === true
            ? selectableOptions[0].id
            : props.markedOption;
        this._markOption(
          this._findIndex(props.options, item => item.id === idToMark),
          props.options,
        );
      }
    }
  }

  _findIndex(arr, predicate) {
    return (Array.isArray(arr) ? arr : []).findIndex(predicate);
  }

  _isSelectableOption(option) {
    return (
      option &&
      option.value !== DIVIDER_OPTION_VALUE &&
      !option.disabled &&
      !option.title
    );
  }

  render() {
    const {
      options,
      visible,
      dropDirectionUp,
      tabIndex,
      onMouseEnter,
      onMouseLeave,
      fixedHeader,
      withArrow,
      fixedFooter,
      inContainer,
      overflow,
      maxHeightPixels,
      minWidthPixels,
      infiniteScroll,
      dataHook,
    } = this.props;

    const renderedOptions = options.map((option, idx) =>
      this._renderOption({ option, idx }),
    );

    return (
      <div
        data-hook={dataHook}
        className={st(classes.root, {
          visible,
          withArrow,
          direction: dropDirectionUp
            ? DROPDOWN_LAYOUT_DIRECTIONS.UP
            : DROPDOWN_LAYOUT_DIRECTIONS.DOWN,
          containerStyles: !inContainer,
        })}
        tabIndex={tabIndex}
        onKeyDown={this._onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          {...this._getDataAttributes()}
          className={classes.contentContainer}
          style={{
            overflow,
            maxHeight: getUnit(maxHeightPixels),
            minWidth: getUnit(minWidthPixels),
          }}
        >
          {this._renderNode(fixedHeader)}
          <div
            className={classes.options}
            style={{
              maxHeight: getUnit(parseInt(maxHeightPixels, 10) - 35),
              overflow,
            }}
            ref={_options => (this.options = _options)}
            data-hook={DATA_HOOKS.DROPDOWN_LAYOUT_OPTIONS}
          >
            {infiniteScroll
              ? this._wrapWithInfiniteScroll(renderedOptions)
              : renderedOptions}
          </div>
          {this._renderNode(fixedFooter)}
        </div>
        {this._renderTopArrow()}
      </div>
    );
  }
}

const optionPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func])
    .isRequired,
  disabled: PropTypes.bool,
  overrideStyle: PropTypes.bool,
  /* the string displayed within the input when the option is selected */
  label: PropTypes.string,
});

export function optionValidator(props, propName, componentName) {
  const option = props[propName];

  // Notice: We don't use Proptypes.oneOf() to check for either option OR divider, because then the failure message would be less informative.
  if (typeof option === 'object' && option.value === DIVIDER_OPTION_VALUE) {
    return;
  }

  const optionError = PropTypes.checkPropTypes(
    { option: optionPropTypes },
    { option },
    'option',
    componentName,
  );

  if (optionError) {
    return optionError;
  }

  if (option.id && option.id.toString().trim().length === 0) {
    return new Error(
      'Warning: Failed option type: The option `option.id` should be non-empty after trimming in `DropdownLayout`.',
    );
  }

  if (option.value && option.value.toString().trim().length === 0) {
    return new Error(
      'Warning: Failed option type: The option `option.value` should be non-empty after trimming in `DropdownLayout`.',
    );
  }

  if (option.label && option.label.toString().trim().length === 0) {
    return new Error(
      'Warning: Failed option type: The option `option.label` should be non-empty after trimming in `DropdownLayout`.',
    );
  }
}

DropdownLayout.propTypes = {
  /** @deprecated */
  dropDirectionUp: PropTypes.bool,
  /** Scroll to the selected option on opening the dropdown */
  focusOnSelectedOption: PropTypes.bool,
  /** Callback function called whenever the user press the `Escape` keyboard.*/
  onClose: PropTypes.func,
  /** Callback function called whenever the user selects a different option in the list */
  onSelect: PropTypes.func,
  /** Callback function called whenever an option becomes focused (hovered/active). Receives the relevant option object from the original props.options array. */
  onOptionMarked: PropTypes.func,
  /** Set overflow of container */
  overflow: PropTypes.string,
  /** Should show or hide the component */
  visible: PropTypes.bool,
  /** Array of objects:
   * - id `<string / number>` *required*: the id of the option, should be unique.
   * - value `<function / string / node>` *required*: can be a string, react element or a builder function.
   * - disabled `<bool>` *default value- false*: whether this option is disabled or not
   * - linkTo `<string>`: when provided the option will be an anchor to the given value
   * - overrideStyle `<bool>` *default value- false*: when this is on, no external style will be added to this option, only the internal node style, for further information see the examples
   * - label `<string>`: the string displayed within an input when the option is selected. This is used when using `<DropdownLayout/>` with an `<Input/>`.
   */
  options: PropTypes.arrayOf(optionValidator),
  /** The id of the selected option in the list  */
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Specifies the tab order of the component. */
  tabIndex: PropTypes.number,
  /** @deprecated Do not use this prop. */
  onClickOutside: PropTypes.func,
  /** A fixed header to the list */
  fixedHeader: PropTypes.node,
  /** A fixed footer to the list */
  fixedFooter: PropTypes.node,
  /** Set the max height of the dropdownLayout in pixels */
  maxHeightPixels: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Set the min width of the dropdownLayout in pixels   */
  minWidthPixels: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** @deprecated Do not use this prop. */
  withArrow: PropTypes.bool,
  /** Closes DropdownLayout on option selection */
  closeOnSelect: PropTypes.bool,
  /** Callback function called whenever the user entered with the mouse to the dropdown layout.*/
  onMouseEnter: PropTypes.func,
  /** Callback function called whenever the user exited with the mouse from the dropdown layout.*/
  onMouseLeave: PropTypes.func,
  /** @deprecated Do not use this prop. */
  itemHeight: PropTypes.oneOf(['small', 'big']),
  /** Whether the selected option will be highlighted when dropdown reopened. */
  selectedHighlight: PropTypes.bool,
  /** Whether the `<DropdownLayout/>` is in a container component. If `true`, some styles such as shadows, positioning and padding will be added the the component contentContainer. */
  inContainer: PropTypes.bool,
  /** Set this prop for lacy loading of the dropdown layout items.*/
  infiniteScroll: PropTypes.bool,
  /** A callback called when more items are requested to be rendered. */
  loadMore: PropTypes.func,
  /** Whether there are more items to be loaded. */
  hasMore: PropTypes.bool,
  /** Sets the default hover behavior when:
   *  1. `false` means no default
   *  2. `true` means to hover the first selectable option
   *  3. Any number/string represents the id of option to hover
   */
  markedOption: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
};

DropdownLayout.defaultProps = {
  options: [],
  tabIndex: 0,
  maxHeightPixels: 260,
  closeOnSelect: true,
  itemHeight: 'small',
  selectedHighlight: true,
  inContainer: false,
  infiniteScroll: false,
  loadMore: null,
  hasMore: false,
  markedOption: false,
  overflow: 'auto',
};

DropdownLayout.displayName = 'DropdownLayout';

DropdownLayout.NONE_SELECTED_ID = NOT_HOVERED_INDEX;

export default DropdownLayout;
