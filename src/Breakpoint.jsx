import React from 'react';
import breakpoints from './breakpoints';

class Breakpoint extends React.Component {

  state = {
    breakpoint: breakpoints.getBreakpoints()[0]
  }

  componentDidMount() {
    this.queries = [];
    breakpoints.getBreakpoints().forEach(breakpoint => {
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
    if (this.props[breakpoint.name]) {
      return this.props[breakpoint.name]();
    }
    
    if (this.props.render) {
      return this.props.render(breakpoint.name);
    }

    return this.props.children(breakpoint.name);
  }
}

export default Breakpoint;