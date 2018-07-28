import breakpoints from './breakpoints';

const configure = (newBreakpoints) => {
  breakpoints.configureBreakpoints(newBreakpoints);
}

export {
  configure
}