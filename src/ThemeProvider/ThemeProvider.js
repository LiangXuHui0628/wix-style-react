import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import { ThemeContext } from './ThemeContext';

/** ThemeProvider */
class ThemeProvider extends React.PureComponent {
  _parseTheme(theme) {
    const style = {};
    for (const [key, value] of Object.entries(theme)) {
      if (
        key !== 'className' &&
        key !== 'icons' &&
        key !== 'componentWrapper'
      ) {
        style[`--wsr-${kebabCase(key)}`] = value;
      }
    }

    return style;
  }

  render() {
    const { dataHook, theme = {}, children } = this.props;
    return (
      <div
        className={theme.className}
        style={this._parseTheme(theme)}
        data-hook={dataHook}
      >
        <ThemeContext.Provider value={{ icons: theme.icons }}>
          {theme.componentWrapper
            ? theme.componentWrapper({ children })
            : children}
        </ThemeContext.Provider>
      </div>
    );
  }
}

ThemeProvider.displayName = 'ThemeProvider';

ThemeProvider.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** A theme object */
  theme: PropTypes.shape({
    className: PropTypes.string, // Applies a main class on the root element, useful when theming with the stylable approach
    icons: PropTypes.object, // an object of icons mapping per component
    componentWrapper: PropTypes.func, // a function that returns a component to be placed between the theme and the children
    color00: PropTypes.string,
    color05: PropTypes.string,
    color10: PropTypes.string,
    color20: PropTypes.string,
    color30: PropTypes.string,
    color40: PropTypes.string,
    color50: PropTypes.string,
    color60: PropTypes.string,
    textColorPrimary: PropTypes.string,
    textColorSecondary: PropTypes.string,
    textColorPrimaryLight: PropTypes.string,
    textColorSecondaryLight: PropTypes.string,
    dividerColor: PropTypes.string,
  }),
};

ThemeProvider.defaultProps = {};

export default ThemeProvider;
