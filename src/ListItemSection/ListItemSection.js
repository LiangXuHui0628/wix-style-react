import React from 'react';
import PropTypes from 'prop-types';

import { st, classes } from './ListItemSection.st.css';
import Divider from '../Divider';
import Text from '../Text';
import TextButton from '../TextButton';
import { dataHooks } from './constants';
import { isString } from '../utils/StringUtils';

export const TYPES = {
  WHITESPACE: 'whitespace',
  DIVIDER: 'divider',
  TITLE: 'title',
  SUBHEADER: 'subheader',
};

/** ListItemSection description */
class ListItemSection extends React.PureComponent {
  static displayName = 'ListItemSection';

  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests */
    dataHook: PropTypes.string,

    /** A css class to be applied to the component's root element */
    className: PropTypes.string,

    /** A list item section can be
     *  * `title` - Acts as a title for following list items.
     *  * `subheader` - Acts as separator between list items for differentiation.
     *  * `whitespace` - Adds some padding between list items.
     *  * `divider` - Same as whitespace, but with a line.
     */
    type: PropTypes.oneOf(Object.values(TYPES)),

    /** Text of the list item */
    title: PropTypes.string,

    /** Suffix node. Renders TextButton for a string otherwise the node itself.*/
    suffix: PropTypes.node,

    /** If true, long text won't break into more than one line and will be terminated with an ellipsis */
    ellipsis: PropTypes.bool,

    /** A callback function called when suffix is clicked */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    type: TYPES.TITLE,
    ellipsis: false,
    dataHook: 'list-item-section',
  };

  state = {};

  render() {
    const { type } = this.props;

    if (type === TYPES.WHITESPACE) return this._renderDivisionElements();

    if (type === TYPES.DIVIDER)
      return this._renderDivisionElements(<Divider />);

    return this._renderTitle();
  }

  _renderDivisionElements = children => {
    const { dataHook, type } = this.props;
    return (
      <div
        className={st(classes.root, { [type]: true })}
        data-hook={dataHook}
        onClick={e => e.stopPropagation()}
        children={children}
      />
    );
  };

  _renderTitle = () => {
    const {
      dataHook,
      className,
      type,
      title,
      suffix,
      ellipsis,
      onClick,
    } = this.props;

    return (
      <div
        className={st(
          classes.root,
          { subheader: type === TYPES.SUBHEADER },
          className,
        )}
        data-hook={dataHook}
      >
        {/* Text */}
        <Text
          dataHook={dataHooks.TITLE}
          tagName="div"
          size="small"
          className={classes.title}
          ellipsis={ellipsis}
          showDelay={300}
        >
          {title}
        </Text>

        {/* Suffix */}
        {isString(suffix) ? (
          <TextButton
            onClick={onClick}
            className={st(classes.suffix, { ellipsis })}
            dataHook={dataHooks.SUFFIX}
            size="tiny"
          >
            {suffix}
          </TextButton>
        ) : (
          suffix
        )}
      </div>
    );
  };
}

export default ListItemSection;

export const listItemSectionBuilder = ({
  id,
  className,
  dataHook,
  type,
  title,
  suffix,
  ellipsis,
}) => ({
  id,
  overrideStyle: true,
  disabled: true,
  value: props => (
    <ListItemSection
      className={className}
      dataHook={dataHook}
      type={type}
      title={title}
      suffix={suffix}
      ellipsis={ellipsis}
      {...props}
    />
  ),
});
