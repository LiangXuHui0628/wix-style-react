import React from 'react';
import PropTypes from 'prop-types';
import { withFocusable } from 'wix-ui-core/dist/src/hocs/Focusable';
import ChevronRight from 'wix-ui-icons-common/ChevronRight';

import { st, classes } from './SidebarSectionItem.st.css';
import { dataHooks } from './constants';
import Text from '../Text';
import { SidebarContext } from '../Sidebar/SidebarAPI';
import { sidebarSkins } from '../Sidebar/constants';
import { FontUpgradeContext } from '../FontUpgrade/context';

/** An item for the section within the sidebar */
class SidebarSectionItem extends React.PureComponent {
  static displayName = 'SidebarSectionItem';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests */
    dataHook: PropTypes.string,
    /** A css class to be applied to the component's root element */
    className: PropTypes.string,
    /** Usually plain text, but could be any node */
    children: PropTypes.node.isRequired,
    /** An element to appear at the beginning of the text */
    prefix: PropTypes.node,
    /** An element to appear at the end of the text */
    suffix: PropTypes.node,
    /** Indicates whether to display the item as selected */
    selected: PropTypes.bool,
    /** Indicates whether to display the item as disabled */
    disabled: PropTypes.bool,
    /** Indicates whether to display an icon for drilling in on hover */
    drillable: PropTypes.bool,
    /** Indicates whether to display a low-opacity icon for drilling even without hover, relevant only when drillable is true */
    alwaysDisplayChevron: PropTypes.bool,
    /** A callback to be triggered on click */
    onClick: PropTypes.func,
  };

  render() {
    const {
      dataHook,
      children,
      selected,
      disabled,
      drillable,
      alwaysDisplayChevron,
      prefix,
      suffix,
      onClick,
      className,
      focusableOnFocus,
      focusableOnBlur,
    } = this.props;
    return (
      <SidebarContext.Consumer>
        {context => {
          const skin = (context && context.getSkin()) || sidebarSkins.dark;
          return (
            <button
              data-hook={dataHook}
              onClick={!disabled ? onClick : undefined}
              onFocus={focusableOnFocus}
              onBlur={focusableOnBlur}
              disabled={disabled}
              type="button"
              tabIndex="0"
              className={st(
                classes.root,
                {
                  selected,
                  disabled,
                  prefix: Boolean(prefix),
                  suffix: Boolean(suffix),
                  drillable,
                  skin,
                  alwaysDisplayChevron,
                },
                className,
              )}
            >
              {prefix && (
                <span data-hook={dataHooks.prefix} className={classes.prefix}>
                  {prefix}
                </span>
              )}
              <FontUpgradeContext.Consumer>
                {({ active }) => (
                  <Text
                    className={classes.text}
                    size="small"
                    weight={active ? 'normal' : 'bold'}
                    secondary={skin === sidebarSkins.light}
                    light={skin === sidebarSkins.dark}
                    skin={disabled && 'disabled'}
                  >
                    {children}
                  </Text>
                )}
              </FontUpgradeContext.Consumer>
              {!disabled && (suffix || drillable) && (
                <span data-hook={dataHooks.suffix} className={classes.suffix}>
                  {suffix || (
                    <ChevronRight
                      data-hook="chevron"
                      className={classes.chevron}
                    />
                  )}
                </span>
              )}
            </button>
          );
        }}
      </SidebarContext.Consumer>
    );
  }
}

export default withFocusable(SidebarSectionItem);
