import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import Button from '../Button';
import CloseButton from '../CloseButton';
import { Appearance } from './constants';
import { classes, st } from './SectionHelper.st.css';
import { FontUpgradeContext } from '../FontUpgrade/context';

/**
 * Used in pages where you need to explain or mention things about the content or actions
 */
class SectionHelper extends React.PureComponent {
  render() {
    const {
      dataHook,
      showCloseButton,
      onClose,
      onAction,
      actionText,
      appearance,
      title,
      fullWidth,
      children,
    } = this.props;
    const isExperimentalDark = appearance === Appearance.ExperimentalDark;

    return (
      <div
        data-hook={dataHook}
        data-appearance={appearance}
        className={st(classes.root, {
          appearance,
          withCloseBtn: showCloseButton && !!onClose,
          withTitle: !!title,
          fullWidth,
        })}
      >
        {showCloseButton && onClose && (
          <div className={classes.close}>
            <CloseButton
              dataHook="sectionhelper-close-btn"
              size="medium"
              skin={isExperimentalDark ? 'light' : 'dark'}
              onClick={onClose}
            />
          </div>
        )}

        {title && (
          <div className={classes.title}>
            <FontUpgradeContext.Consumer>
              {context => (
                <Text
                  light={isExperimentalDark}
                  dataHook="sectionhelper-title"
                  size="small"
                  weight={context.active ? 'bold' : 'normal'}
                >
                  {title}
                </Text>
              )}
            </FontUpgradeContext.Consumer>
          </div>
        )}

        <div className={classes.content}>
          <Text size="small" light={isExperimentalDark}>
            {children}
          </Text>
        </div>

        {onAction && actionText && (
          <div className={classes.action}>
            <Button
              size="small"
              skin={isExperimentalDark ? 'standard' : 'dark'}
              priority={isExperimentalDark ? 'primary' : 'secondary'}
              onClick={onAction}
              dataHook="sectionhelper-action-btn"
            >
              {actionText}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

SectionHelper.displayName = 'SectionHelper';

SectionHelper.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** Sets the look and feel of the component */
  appearance: PropTypes.oneOf([
    'warning',
    'standard',
    'danger',
    'success',
    'premium',
    'preview',
    'experimentalDark',
  ]),

  /** Adds text as the title */
  title: PropTypes.node,

  /** decide if to show the close button */
  showCloseButton: PropTypes.bool,

  /** When provided, will make a close button appear and invoke it upon click */
  onClose: PropTypes.func,

  /** When provided, will make an action button appear and invoke it upon click */
  onAction: PropTypes.func,

  /** Text label for the action button */
  actionText: PropTypes.string,

  /** Children to render */
  children: PropTypes.node,

  /** Set the content width to 100% */
  fullWidth: PropTypes.bool,
};

SectionHelper.defaultProps = {
  showCloseButton: true,
  appearance: 'warning',
};

export default SectionHelper;
