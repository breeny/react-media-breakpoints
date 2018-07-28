import breakpoints from './breakpoints';

const configure = (newBreakpoints) => {
  breakpoints.configureBreakpoints(newBreakpoints);
}

export { default } from './Breakpoint';

export {
  configure
}