import React from 'react';
import PropTypes from 'prop-types';
import { classes, st } from './EmptyState.st.css';

import Heading from '../Heading';
import Text from '../Text';
import { FontUpgradeContext } from '../FontUpgrade/context';

/**
 * Representing a state of an empty page, section, table, etc.
 */
const EmptyState = ({
  theme,
  title,
  subtitle,
  image,
  classNames: classNamesProp,
  children,
  dataHook,
  align,
}) => (
  <div
    className={st(classes.root, { theme, align })}
    data-hook={dataHook}
    data-theme={theme}
    data-align={align}
  >
    <div className={classes.container}>
      {image && (
        <div
          className={st(
            classes.imageContainer,
            {},
            (classNamesProp && classNamesProp.imageContainer) || '',
          )}
          data-hook="empty-state-image-container"
        >
          {typeof image === 'string' ? (
            <img
              className={classes.imageElement}
              src={image}
              data-hook="image-element"
            />
          ) : (
            React.cloneElement(image, {
              'data-hook': 'image-node',
            })
          )}
        </div>
      )}

      {title && (
        <div
          className={classes.titleContainer}
          data-hook="empty-state-title-container"
        >
          {theme === 'section' ? (
            <FontUpgradeContext.Consumer>
              {({ active }) => (
                <Text weight={active ? 'bold' : 'normal'}>{title}</Text>
              )}
            </FontUpgradeContext.Consumer>
          ) : (
            <Heading appearance="H3">{title}</Heading>
          )}
        </div>
      )}

      <div
        className={classes.subtitleContainer}
        data-hook="empty-state-subtitle-container"
      >
        <Text secondary>{subtitle}</Text>
      </div>

      {children && (
        <div
          className={classes.childrenContainer}
          data-hook="empty-state-children-container"
        >
          {children}
        </div>
      )}
    </div>
  </div>
);

EmptyState.displayName = 'EmptyState';

EmptyState.propTypes = {
  /** The theme of the EmptyState */
  theme: PropTypes.oneOf(['page', 'page-no-border', 'section']),

  /** Content for the title of the Empty State */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** Content for the subtitle of the Empty State */
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** The Empty State image, can be either a string representing the image URL, or a node to render instead */
  image: PropTypes.node,

  /** The Empty State image bottom margin. If not specified, use the default padding defined in the css */
  classNames: PropTypes.shape({
    imageContainer: PropTypes.string,
  }),

  /** Children to render below the subtitle, ideally an action of some type (Button or TextButton for instance) */
  children: PropTypes.node,

  dataHook: PropTypes.string,

  align: PropTypes.oneOf(['start', 'center', 'end']),
};

EmptyState.defaultProps = {
  theme: 'section',
  image: null,
  children: null,
  align: 'center',
};

export default EmptyState;
