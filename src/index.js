import React from 'react';
import Breakpoint from './Breakpoint';
import breakpoints from './breakpoints';

const configure = (newBreakpoints) => {
  breakpoints.configureBreakpoints(newBreakpoints);
}

const useBreakpoint = React.useEffect ? require('./useBreakpoint') : undefined;

export { Breakpoint, configure, useBreakpoint };

