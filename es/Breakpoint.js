function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import breakpoints from './breakpoints';
import PropTypes from 'prop-types';

var Breakpoint = function (_React$Component) {
  _inherits(Breakpoint, _React$Component);

  function Breakpoint() {
    var _temp, _this, _ret;

    _classCallCheck(this, Breakpoint);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      breakpoint: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Breakpoint.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.queries = [];
    var _breakpoints = [];
    var query = this.props.query;

    if (query) {
      _breakpoints = [{
        name: '',
        query: query
      }];
    } else {
      _breakpoints = breakpoints.getBreakpoints();
    }

    if (global.window) {
      _breakpoints.forEach(function (breakpoint) {
        var mq = window.matchMedia(breakpoint.query);

        if (mq.matches) {
          _this2.setState({
            breakpoint: breakpoint
          });
        }

        var listener = function listener(mql) {
          if (mql.matches) {
            _this2.setState({
              breakpoint: breakpoint
            });
          }
        };

        mq.addListener(listener);

        _this2.queries.push({
          query: mq,
          listener: listener
        });
      });
    }
  };

  Breakpoint.prototype.componentWillUnmount = function componentWillUnmount() {
    this.queries.forEach(function (bp) {
      bp.query.removeListener(bp.listener);
    });
  };

  Breakpoint.prototype.render = function render() {
    var breakpoint = this.state.breakpoint;


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
  };

  return Breakpoint;
}(React.Component);

Breakpoint.propTypes = process.env.NODE_ENV !== "production" ? {
  render: PropTypes.func,
  children: PropTypes.func,
  query: PropTypes.string
} : {};


export default Breakpoint;