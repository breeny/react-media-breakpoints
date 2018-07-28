import breakpoints from './breakpoints';

var configure = function configure(newBreakpoints) {
  breakpoints.configureBreakpoints(newBreakpoints);
};

export { default } from './Breakpoint';

export { configure };