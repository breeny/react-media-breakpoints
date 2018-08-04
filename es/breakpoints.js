function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import defaultBreakpoints from './defaultBreakpoints';

var Breakpoints = function () {
  function Breakpoints() {
    _classCallCheck(this, Breakpoints);

    this.generateMediaQueries(defaultBreakpoints);
  }

  Breakpoints.prototype.generateMediaQueries = function generateMediaQueries(breakpoints) {
    var queries = breakpoints.map(function (breakpoint) {

      var query = '';
      if (breakpoint.minWidth) {
        query += '(min-width: ' + breakpoint.minWidth + 'px)';
      }

      if (query && breakpoint.maxWidth) {
        query += ' and ';
      }

      if (breakpoint.maxWidth) {
        query += '(max-width: ' + breakpoint.maxWidth + 'px)';
      }

      return {
        name: breakpoint.name,
        query: query
      };
    });

    this.breakpoints = queries;
  };

  Breakpoints.prototype.configureBreakpoints = function configureBreakpoints(breakpoints) {
    this.generateMediaQueries(breakpoints);
  };

  Breakpoints.prototype.getBreakpoints = function getBreakpoints() {
    return this.breakpoints;
  };

  return Breakpoints;
}();

var breakpoints = new Breakpoints();
export default breakpoints;