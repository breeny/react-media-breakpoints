import defaultBreakpoints from './defaultBreakpoints';

class Breakpoints {

  constructor() {
    this.generateMediaQueries(defaultBreakpoints); 
  }

  generateMediaQueries(breakpoints) {
    const queries = breakpoints.map(breakpoint => {

      let query = '';
      if (breakpoint.minWidth) {
        query += `(min-width: ${breakpoint.minWidth}px)`
      }

      if (query && breakpoint.maxWidth) {
        query += ' and ';
      }

      if (breakpoint.maxWidth) {
        query += `(max-width: ${breakpoint.maxWidth}px)`
      }

      return {
        name: breakpoint.name,
        query
      }
    });

    this.breakpoints = queries;
  }

  configureBreakpoints(breakpoints) {
    this.generateMediaQueries(breakpoints); 
  }

  getBreakpoints() {
    return this.breakpoints;
  }

}

let breakpoints = new Breakpoints();
export default breakpoints;