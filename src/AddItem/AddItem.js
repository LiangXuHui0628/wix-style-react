import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withFocusable } from 'wix-ui-core/dist/src/hocs/Focusable/FocusableHOC';
import { ThemeProviderConsumerBackwardCompatible } from '../ThemeProvider/ThemeProviderConsumerBackwardCompatible';

import AddItemLarge from 'wix-ui-icons-common/system/AddItemLarge';
import AddItemMedium from 'wix-ui-icons-common/system/AddItemMedium';
import AddItemSmall from 'wix-ui-icons-common/system/AddItemSmall';
import Add from 'wix-ui-icons-common/Add';

import Tooltip from '../Tooltip';
import Text from '../Text';
import AddMedia from 'wix-ui-icons-common/system/AddMedia';
import { dataHooks } from './constants';
import { TooltipCommonProps } from '../common/PropTypes/TooltipCommon';

import { st, classes } from './AddItem.st.css';

const AddItemButtonIcons = {
  tiny: ({ className }) => <Add className={className} width="26" height="26" />,
  small: AddItemSmall,
  medium: AddItemMedium,
  large: AddItemLarge,
  image: ({ className }) => (
    <AddMedia className={className} width="31" height="31" />
  ),
};

class AddItem extends Component {
  static displayName = 'AddItem';
  static propTypes = {
    /** any renderable node or a render function. In case of a render function, text styles will not be applied. */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    /** apply disabled styles */
    disabled: PropTypes.bool,

    /** the theme of component */
    theme: PropTypes.oneOf(['dashes', 'plain', 'filled', 'image']),

    /** switching content alignment  */
    alignItems: PropTypes.oneOf(['center', 'right', 'left']),

    /** size to control icon and spacing  */
    size: PropTypes.oneOf(['large', 'medium', 'small', 'tiny']),

    /** click event handler  */
    onClick: PropTypes.func,

    /** Applied as data-hook HTML attribute that can be used to create driver in testing */
    dataHook: PropTypes.string,

    /** A css class to be applied to the component's root element */
    className: PropTypes.string,

    /** When provided, hover will display a tooltip - relevant only for theme `image` */
    tooltipContent: PropTypes.node,

    /** Tooltip props - relevant only for theme `image` */
    tooltipProps: PropTypes.shape(TooltipCommonProps),

    /** Displays the plus icon */
    showIcon: PropTypes.bool,

    /** Removes padding */
    removePadding: PropTypes.bool,

    /** sets the border-radius css property on the button element */
    borderRadius: PropTypes.string,
  };

  static defaultProps = {
    theme: 'dashes',
    size: 'tiny',
    alignItems: 'center',
    showIcon: true,
    removePadding: false,
  };

  _renderIcon = () => {
    const { size, theme } = this.props;

    const isImageIcon = theme === 'image';

    return (
      <ThemeProviderConsumerBackwardCompatible
        defaultIcons={{
          AddItemButton: AddItemButtonIcons,
        }}
      >
        {({ icons }) => {
          const Icon = icons.AddItemButton[isImageIcon ? 'image' : size];
          return <Icon className={classes.icon} />;
        }}
      </ThemeProviderConsumerBackwardCompatible>
    );
  };

  _renderText = () => {
    const { children, theme, size } = this.props;

    if (!children || theme === 'image') {
      return null;
    }

    const textSize = size === 'tiny' ? 'small' : 'medium';

    return (
      <div className={st(classes.textWrapper, { size })}>
        {typeof children === 'function' ? (
          children()
        ) : (
          <Text
            className={classes.textContent}
            weight="thin"
            skin="standard"
            size={textSize}
            dataHook={dataHooks.itemText}
            ellipsis
          >
            {children}
          </Text>
        )}
      </div>
    );
  };

  _renderContent = () => {
    const {
      theme,
      alignItems,
      size,
      disabled,
      showIcon,
      tooltipContent,
      tooltipProps = {},
    } = this.props;

    // For backwards compatibility
    const content = tooltipProps.content || tooltipContent;

    const container = (
      <div
        className={st(classes.content, {
          theme,
          size,
          alignItems,
          disabled,
          tooltip: !!content,
        })}
      >
        {showIcon && this._renderIcon()}
        {this._renderText()}
      </div>
    );

    return theme === 'image' && !!content ? (
      <Tooltip
        {...tooltipProps}
        content={content}
        dataHook={dataHooks.itemTooltip}
        className={classes.tooltip}
      >
        {container}
      </Tooltip>
    ) : (
      container
    );
  };

  render() {
    const {
      dataHook,
      onClick,
      disabled,
      theme,
      focusableOnFocus,
      focusableOnBlur,
      removePadding,
      borderRadius,
      className,
    } = this.props;

    return (
      <button
        className={st(
          classes.root,
          { theme, removePadding, borderRadius },
          className,
        )}
        style={borderRadius && { borderRadius }}
        data-hook={dataHook}
        disabled={disabled}
        type="button"
        onClick={onClick}
        onFocus={focusableOnFocus}
        onBlur={focusableOnBlur}
      >
        {this._renderContent()}
      </button>
    );
  }
}
export default withFocusable(AddItem);
