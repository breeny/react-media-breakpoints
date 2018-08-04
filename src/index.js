import Breakpoint from './Breakpoint';
import breakpoints from './breakpoints';

const configure = (newBreakpoints) => {
  breakpoints.configureBreakpoints(newBreakpoints);
}

export { Breakpoint, configure };

