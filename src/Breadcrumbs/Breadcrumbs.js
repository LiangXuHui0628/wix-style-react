import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import BreadcrumbsChevronRight from 'wix-ui-icons-common/system/BreadcrumbsChevronRight';
import { DATA_HOOKS, DATA_ATTRIBUTES, THEMES } from './constnats';
import { FontUpgradeContext } from '../FontUpgrade/context';
import { st, classes } from './Breadcrumbs.st.css';

/**
 * a way to visualise current navigation path
 */
class Breadcrumbs extends React.PureComponent {
  static displayName = 'Breadcrumbs';

  static propTypes = {
    /**
     * * __id__ - Specifies the item id
     * * __link__ - Optional link to be called on click
     * * __value__ - Value to be shown on breadcrumb
     * * __disabled__ - if this value is disabled
     * * __customElement__ - A custom item which will be rendered
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        value: PropTypes.node.isRequired,
        link: PropTypes.string,
        customElement: PropTypes.any,
        disabled: PropTypes.bool,
      }),
    ).isRequired,
    onClick: PropTypes.func,
    activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['medium', 'large']),
    /** The maximum width of Breadcrumb item */
    itemMaxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    theme: PropTypes.oneOf([
      'onWhiteBackground',
      'onGrayBackground',
      'onDarkBackground',
    ]),
    /** Applied as data-hook HTML attribute that can be used to create driver in testing */
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    size: 'medium',
    theme: 'onGrayBackground',
    itemMaxWidth: '240px',
    onClick: () => {},
  };

  _createItem({ item, isActive, onClick, maxWidth, id }) {
    const active = isActive;
    const breadcrumbText = value => {
      const { theme, size } = this.props;
      const isSmallSize = size === 'medium';

      return (
        <FontUpgradeContext.Consumer>
          {({ active }) => (
            <Text
              dataHook={DATA_HOOKS.BREADCRUMBS_ITEM}
              weight={isActive ? 'normal' : 'thin'}
              light={theme === THEMES.onDarkBackground}
              size={isSmallSize ? 'small' : 'medium'}
              secondary={active && !isActive}
              ellipsis
            >
              {value}
            </Text>
          )}
        </FontUpgradeContext.Consumer>
      );
    };

    const defaultBreadcrumb = id => {
      const { disabled } = item;
      const { className } = this.props;
      const button = true;
      return (
        <button
          type="button"
          data-hook={`${DATA_HOOKS.BREADCRUMB_CLICKABLE}-${id}`}
          className={st(classes.item, { button, disabled, active }, className)}
          onClick={onClick}
          children={breadcrumbText(item.value)}
          style={{ maxWidth }}
        />
      );
    };

    const linkBreadcrumb = id => {
      const { disabled } = item;
      const { className } = this.props;
      const link = true;
      return (
        <a
          href={item.link}
          data-hook={`${DATA_HOOKS.BREADCRUMB_CLICKABLE}-${id}`}
          className={st(classes.item, { link, disabled, active }, className)}
          onClick={onClick}
          children={breadcrumbText(item.value)}
          style={{ maxWidth }}
        />
      );
    };

    const customBreadcrumb = id => {
      const { className } = this.props;
      return (
        <span
          data-hook={`${DATA_HOOKS.BREADCRUMB_CLICKABLE}-${id}`}
          className={st(classes.item, {}, className)}
          onClick={onClick}
          children={breadcrumbText(item.customElement)}
          style={{ maxWidth }}
        />
      );
    };

    if (isActive) {
      return defaultBreadcrumb(id);
    } else if (item.customElement) {
      return customBreadcrumb(id);
    } else if (item.link) {
      return linkBreadcrumb(id);
    } else {
      return defaultBreadcrumb(id);
    }
  }

  _getIsActive = item => this.props.activeId === item.id;

  _handleItemClick = item => () => !item.disabled && this.props.onClick(item);

  _getItemWrapperDataAttributes = ({ position, item }) => {
    return {
      'data-hook': `${DATA_HOOKS.ITEM_WRAPPER}-${position}`,
      [DATA_ATTRIBUTES.DATA_ACTIVE]: this._getIsActive(item),
      [DATA_ATTRIBUTES.DATA_POSITION_ID]: position,
    };
  };

  render() {
    const {
      items,
      size,
      itemMaxWidth,
      theme,
      className,
      dataHook,
    } = this.props;
    const fullWidth = items.length === 1;

    return (
      <div
        data-hook={dataHook}
        className={st(classes.root, { size, theme }, className)}
        data-size={size}
        data-theme={theme}
      >
        {items.map((item, i, allItems) => {
          const active = this._getIsActive(item);
          return (
            <div
              key={item.id}
              className={st(classes.itemContainer, { active })}
              {...this._getItemWrapperDataAttributes({ position: i, item })}
            >
              {this._createItem({
                id: i,
                item,
                isActive: active,
                onClick: this._handleItemClick(item),
                maxWidth: fullWidth ? 'initial' : itemMaxWidth,
              })}
              {allItems[i + 1] && (
                <BreadcrumbsChevronRight className={classes.divider} />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Breadcrumbs;
