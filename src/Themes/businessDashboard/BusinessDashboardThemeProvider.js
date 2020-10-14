import * as React from 'react';
import { ThemeContext } from '../../ThemeProvider/ThemeContext';
import kebabCase from 'lodash/kebabCase';
import { theme as BusinessDashboardTheme } from '.';

export class BusinessDashboardThemeProvider extends React.PureComponent {
  _parseTheme(theme) {
    const style = {};
    for (const [key, value] of Object.entries(theme)) {
      if (key !== 'className' && key !== 'icons') {
        style[`--wsr-${kebabCase(key)}`] = value;
      }
    }

    return style;
  }
  render() {
    const { active, dataHook, children } = this.props;

    if (active === 'false' || active === false) {
      return <>{children}</>;
    }

    const theme = BusinessDashboardTheme();
    return (
      <div
        className={theme.className}
        style={this._parseTheme(theme)}
        data-hook={dataHook}
      >
        <ThemeContext.Provider value={{ icons: theme.icons }}>
          {theme.componentWrapper({ children })}
        </ThemeContext.Provider>
      </div>
    );
  }
}
