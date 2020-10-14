import * as React from 'react';
import { classes } from './BusinessDashboard.st.css';
import FontUpgrade from '../../FontUpgrade';

export default ({ active } = {}) => ({
  className: active === false ? '' : classes.root,
  componentWrapper: ({ children }) => <FontUpgrade>{children}</FontUpgrade>,
});
