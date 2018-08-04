import React from 'react';
import breakpoints from './breakpoints';
import PropTypes from 'prop-types';

class Breakpoint extends React.Component {

  static propTypes = {
    render: PropTypes.func,
    children: PropTypes.func,
    query: PropTypes.string,
  }

  state = {
    breakpoint: null,
  }

  componentDidMount() {
    this.queries = [];
    let _breakpoints = [];
    const { query } = this.props;
    if (query) {
      _breakpoints = [{
        name: '',
        query
      }]
    } else {
      _breakpoints = breakpoints.getBreakpoints();
    }

    _breakpoints.forEach(breakpoint => {
      const mq = window.matchMedia(breakpoint.query);

      if (mq.matches) {
        this.setState({
          breakpoint
        });
      }

      const listener = (mql) => {
        if (mql.matches) {
          this.setState({
            breakpoint
          })
        }
      }

      mq.addListener(listener);

      this.queries.push({
        query: mq,
        listener,
      })
    });
  }

  componentWillUnmount() {
    this.queries.forEach(bp => {
      bp.query.removeListener(bp.listener);
    })
  }

  render() {
    const { breakpoint } = this.state;
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

export default Breakpoint;