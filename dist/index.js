(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types'], factory) :
  (global = global || self, factory(global['react-media-breakpoints'] = {}, global.React, global['prop-types']));
}(this, function (exports, React, PropTypes) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defaultBreakpoints = [{
    "name": "mobile",
    "maxWidth": 767
  }, {
    "name": "tablet",
    "minWidth": 768,
    "maxWidth": 1023
  }, {
    "name": "desktop",
    "minWidth": 1024
  }];

  class Breakpoints {
    constructor() {
      this.generateMediaQueries(defaultBreakpoints);
    }

    generateMediaQueries(breakpoints) {
      const queries = breakpoints.map(breakpoint => {
        let query = '';

        if (breakpoint.minWidth) {
          query += `(min-width: ${breakpoint.minWidth}px)`;
        }

        if (query && breakpoint.maxWidth) {
          query += ' and ';
        }

        if (breakpoint.maxWidth) {
          query += `(max-width: ${breakpoint.maxWidth}px)`;
        }

        return {
          name: breakpoint.name,
          query
        };
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

  class Breakpoint extends React.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        breakpoint: null
      });
    }

    componentDidMount() {
      this.queries = [];
      let _breakpoints = [];
      const {
        query
      } = this.props;

      if (query) {
        _breakpoints = [{
          name: '',
          query
        }];
      } else {
        _breakpoints = breakpoints.getBreakpoints();
      }

      if (global.window) {
        _breakpoints.forEach(breakpoint => {
          const mq = window.matchMedia(breakpoint.query);

          if (mq.matches) {
            this.setState({
              breakpoint
            });
          }

          const listener = mql => {
            if (mql.matches) {
              this.setState({
                breakpoint
              });
            }
          };

          mq.addListener(listener);
          this.queries.push({
            query: mq,
            listener
          });
        });
      }
    }

    componentWillUnmount() {
      this.queries.forEach(bp => {
        bp.query.removeListener(bp.listener);
      });
    }

    render() {
      let {
        breakpoint
      } = this.state;

      if (!breakpoint && !global.window) {
        breakpoint = {
          name: 'server'
        };
      }

      if (breakpoint) {
        if (breakpoint.name && this.props[breakpoint.name]) {
          return this.props[breakpoint.name]();
        }

        if (this.props.render) {
          return this.props.render(breakpoint.name);
        }

        if (this.props.children) {
          return this.props.children(breakpoint.name);
        }
      }

      return null;
    }

  }

  _defineProperty(Breakpoint, "propTypes", {
    render: PropTypes.func,
    children: PropTypes.func,
    query: PropTypes.string
  });

  const configure = newBreakpoints => {
    breakpoints.configureBreakpoints(newBreakpoints);
  };

  exports.Breakpoint = Breakpoint;
  exports.configure = configure;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
