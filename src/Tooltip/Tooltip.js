import PropTypes from 'prop-types';
import React from 'react';
import { Tooltip as CoreTooltip } from 'wix-ui-core/dist/src/components/tooltip';
import RawText from '../Text/RawText';
import { st, classes } from './Tooltip.st.css';
import { dataHooks, TIMEOUT } from './constants';
import { FontUpgradeContext } from '../FontUpgrade/context';
import FontUpgrade from '../FontUpgrade';

/**
 * Next Tooltip
 */
class Tooltip extends React.PureComponent {
  static displayName = 'Tooltip';

  static propTypes = {
    /** applied as data-hook HTML attribute that can be used to create driver in testing */
    dataHook: PropTypes.string,
    /** A css class to be applied to the component's root element */
    className: PropTypes.string,
    /** tooltip trigger element. Can be either string or renderable node */
    children: PropTypes.node.isRequired,
    /** tooltip content. Can be either string or renderable node */
    content: PropTypes.node,
    /** align tooltip content */
    textAlign: PropTypes.oneOf(['start', 'center']),
    /** time in milliseconds to wait before showing the tooltip */
    enterDelay: PropTypes.number,
    /**  time in milliseconds to wait before hiding the tooltip. Defaults to 0. */
    exitDelay: PropTypes.number,
    /** moves tooltip content relative to the parent by x or y */
    moveBy: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
    /** Moves arrow by amount */
    moveArrowTo: PropTypes.number,
    /** tooltips content calculation relation to a dom element. Can be either:
     *  `'window', 'scrollParent', 'viewport', 'parent'`, `element` or
     * `function` based predicate i.e. (elm) =>
     *  elm.getAttribute('data-hook') === 'value'
     */
    appendTo: PropTypes.oneOfType([
      PropTypes.oneOf(['window', 'scrollParent', 'viewport', 'parent']),
      PropTypes.element,
      PropTypes.func,
    ]),
    /** whether to enable the flip behaviour. This behaviour is used to flip the Tooltips placement when it starts to overlap the target element. */
    flip: PropTypes.bool,
    /** whether to enable the fixed behaviour. This behaviour is used to keep the Tooltip at it's original placement even when it's being positioned outside the boundary. */
    fixed: PropTypes.bool,
    /** tooltip content container width in pixels */
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** callback on tooltips content show event */
    onShow: PropTypes.func,
    /** callback on tooltips content hide event */
    onHide: PropTypes.func,
    /** tooltip content placement in relation to target element */
    placement: PropTypes.string,
    /** disables tooltip element trigger behaviour. If not specified, `disabled` prop of the `children` element will be used. */
    disabled: PropTypes.bool,
    /** sets size of the tooltip */
    size: PropTypes.oneOf(['small', 'medium']),
    /** establishes a relationship between tooltip element and tooltip content for a11y purposes */
    'aria-describedby': PropTypes.string,
    /** tooltips content zindex */
    zIndex: PropTypes.number,
  };

  state = {
    disabled: false,
  };

  static defaultProps = {
    content: '',
    appendTo: 'window',
    placement: 'top',
    enterDelay: 0,
    exitDelay: 0,
    maxWidth: 204,
    flip: true,
    fixed: false,
    textAlign: 'start',
    size: 'medium',
    zIndex: 6000,
  };

  _renderContent = () => {
    const { content, textAlign, size } = this.props;
    const textSize = size === 'small' ? 'tiny' : 'small';
    return (
      <FontUpgradeContext.Consumer>
        {({ active }) => {
          return (
            <div style={{ textAlign }}>
              <FontUpgrade active={!!active}>
                {typeof content === 'string' ? (
                  <RawText
                    dataHook={dataHooks.tooltipText}
                    size={textSize}
                    weight="normal"
                    light
                  >
                    {content}
                  </RawText>
                ) : (
                  content
                )}
              </FontUpgrade>
            </div>
          );
        }}
      </FontUpgradeContext.Consumer>
    );
  };

  render() {
    const {
      exitDelay,
      enterDelay,
      children,
      content,
      size,
      dataHook,
      disabled,
      className,
      ...rest
    } = this.props;

    return (
      <CoreTooltip
        {...rest}
        data-hook={dataHook}
        className={st(classes.root, { size }, className)}
        content={this._renderContent()}
        hideDelay={exitDelay}
        showDelay={enterDelay}
        disabled={
          disabled === undefined
            ? children.props && children.props.disabled
            : disabled
        }
        showArrow
        timeout={TIMEOUT}
      >
        {children}
      </CoreTooltip>
    );
  }
}

export default Tooltip;
