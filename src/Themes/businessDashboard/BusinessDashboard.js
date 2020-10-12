import { classes } from './BusinessDashboard.st.css';

export default ({ active } = {}) => ({
  className: active === false ? '' : classes.root,
});
