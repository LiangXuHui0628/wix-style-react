import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import { avatarShapes, dataHooks } from './constants';
import { Avatar as CoreAvatar } from 'wix-ui-core/dist/src/components/avatar';
import Loader from '../Loader';
import { placeholderSVGs } from './assets';
import { st, classes } from './Avatar.st.css';
import { capitalize } from '../utils/cssClassUtils';
import stringToColor from './string-to-color';
import { FontUpgradeContext } from '../FontUpgrade/context';

const getSizeNumber = size => Number(size.substring(4));
const defaultSize = 48;
const minSmallIconButton = 60;

/**
 * Avatar is a type of element that visually represents a user, either as an image, name initials or placeholder icon.
 */

class Avatar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fadeIndication: false,
      showIndication: false,
    };
  }

  _onMouseEnter = () => {
    if (this.props.showIndicationOnHover) {
      this.setState({ showIndication: true });
    }
  };

  _onMouseLeave = () => {
    if (this.props.showIndicationOnHover) {
      this.setState({ fadeIndication: true });
      setTimeout(
        () => this.setState({ fadeIndication: false, showIndication: false }),
        150,
      );
    }
  };

  render() {
    const {
      size,
      presence,
      indication,
      color,
      customIndication,
      onIndicationClick,
      dataHook,
      className,
      shape,
      text,
      placeholder,
      name,
      onClick,
      showIndicationOnHover,
      loading,
      ...rest
    } = this.props;
    const { fadeIndication, showIndication } = this.state;

    const calculatedColor = color || stringToColor(text || name); // if color is provided as a prop use it, otherwise, generate a color based on the text
    const sizeNumber = getSizeNumber(size);
    const renderOnHover = !showIndicationOnHover || showIndication;
    const indicationConstraints = renderOnHover && sizeNumber >= defaultSize;
    const renderIndication =
      indicationConstraints && !customIndication && indication;
    const renderCustomIndication = indicationConstraints && customIndication;
    const renderLoader = loading && sizeNumber >= defaultSize;
    return (
      <div
        data-hook={dataHook}
        className={classNames(className, classes.externalContainer)}
      >
        <FontUpgradeContext.Consumer>
          {({ active }) => (
            <div
              data-hook={dataHooks.avatarWSR}
              onMouseEnter={this._onMouseEnter}
              onMouseLeave={this._onMouseLeave}
              className={st(classes.avatarContainer, {
                shape,
                size,
                indication: Boolean(customIndication || indication),
                presence: Boolean(presence),
                presenceType: presence,
                clickable: !!onClick,
                fade: fadeIndication,
                hasText: !!text,
              })}
              data-madefor={active}
            >
              <div className={classes.coreAvatar}>
                <CoreAvatar
                  {...{
                    ...rest,
                    placeholder: placeholder ? (
                      placeholder
                    ) : (
                      <AvatarDefaultPlaceholder shape={shape} size={size} />
                    ),
                    text,
                    name,
                    onClick,
                    initialsLimit: sizeNumber < 30 ? 1 : undefined,
                    'data-hook': dataHooks.avatarCore,
                  }}
                  className={classNames(
                    classes.avatar,
                    classes[`color${capitalize(calculatedColor)}`],
                  )}
                />
              </div>
              {renderLoader && [
                <div
                  key="overlay"
                  className={classNames(
                    classes.loaderContainer,
                    classes.overlay,
                  )}
                />,
                <div
                  key="loader"
                  className={classNames(
                    classes.loaderContainer,
                    classes.loader,
                  )}
                >
                  <Loader dataHook={dataHooks.loader} size="tiny" />
                </div>,
              ]}
              {presence && <div className={classes.presence} />}
              {renderIndication && (
                <div className={classes.indication}>
                  <IconButton
                    className={classes.iconButtonShadow}
                    dataHook={dataHooks.indication}
                    onClick={onIndicationClick}
                    skin="inverted"
                    shape={shape}
                    size={sizeNumber > minSmallIconButton ? 'small' : 'tiny'}
                  >
                    {indication}
                  </IconButton>
                </div>
              )}
              {renderCustomIndication && (
                <div
                  className={classes.indication}
                  data-hook={dataHooks.customIndication}
                  onClick={onIndicationClick}
                >
                  {customIndication}
                </div>
              )}
            </div>
          )}
        </FontUpgradeContext.Consumer>
      </div>
    );
  }
}

const AvatarDefaultPlaceholder = ({ shape, size }) =>
  shape !== avatarShapes.square
    ? placeholderSVGs[size][avatarShapes.circle]
    : placeholderSVGs[size][avatarShapes.square];

const CoreAvatarPropTypes = {
  /**
   * The name of the avatar user. Text initials will be generated from the name.
   * The name value will be used as default value for html `title` and `aria-label`
   * attributes. And also as default value for the image's `alt` attribute if
   * `imgProps` is provided.
   */
  name: PropTypes.string,
  /** Text to render as content. */
  text: PropTypes.string,
  /**
   * A node with a placeholder to be rendered as content. Will be displayed if no
   * `text`, `name` or `imgProps` are provided. Defaults to an generic Avatar user
   * icon.
   */
  placeholder: PropTypes.node,
  /** Props for an `<img>` tag to be rendered as content. */
  imgProps: PropTypes.object,
  /** Used to define a string that labels the current element in case where a text label is not visible on the screen. */
  ariaLabel: PropTypes.string,
  /** HTML title attribute value. To be applied on the root element. */
  title: PropTypes.string,
  /**
   * Click event handler (when this property is provided the component will be clickable
   * on hover and will have a pointer cursor).
   */
  onClick: PropTypes.func,
};

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
  ...CoreAvatarPropTypes,
  /** Avatar size. Options like 'size90' mean that the width and height are 90px. */
  size: PropTypes.oneOf([
    'size90',
    'size72',
    'size60',
    'size48',
    'size36',
    'size30',
    'size24',
    'size18',
  ]),
  /**
   * Background color of the avatar. When no color is provided the color is determined
   * by the provided text or name so that each name will receive a different color.
   */
  color: PropTypes.oneOf(['A1', 'A2', 'A3', 'A4', 'A5', 'A6']),
  /** Shape of the image, can be square or circle. */
  shape: PropTypes.oneOf(['circle', 'square']),
  /** Classes to be applied to the root element. */
  className: PropTypes.string,
  /** Applied as data-hook HTML attribute that can be used to create driver in testing. */
  dataHook: PropTypes.string,
  /** Avatar presence. Options like 'online' mean that the contact is online. */
  presence: PropTypes.oneOf(['online', 'offline', 'busy']),
  /** A node to be rendered as Indication. */
  indication: PropTypes.node,
  /** A node to be rendered as a custom indication, that is not wrapped by an IconButton. This node could be rendered in other shapes (such as square). */
  customIndication: PropTypes.node,
  /** Function which triggers on indication click. */
  onIndicationClick: PropTypes.func,
  /** Show indication on hover. */
  showIndicationOnHover: PropTypes.bool,
  /** Explicitly show a loader on top of the Avatar, commonly used when uploading an image and indicating a loading state */
  loading: PropTypes.bool,
};

Avatar.defaultProps = {
  size: 'size48',
  shape: 'circle',
  showIndicationOnHover: false,
};

export default Avatar;
