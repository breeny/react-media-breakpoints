import Breakpoint from './Breakpoint';
import breakpoints from './breakpoints';

var configure = function configure(newBreakpoints) {
  breakpoints.configureBreakpoints(newBreakpoints);
};

export { Breakpoint, configure };