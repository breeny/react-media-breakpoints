import React from 'react';
import listeners from './listener';
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

  constructor() {
    super();
    this.factory = listeners();
  }

  onBreakpointChange = (breakpoint) => {
    this.setState({ breakpoint });
  }

  componentDidMount() {
    const { query } = this.props;
    this.factory.createListeners(this.onBreakpointChange, query); 
  }

  componentWillUnmount() {
    this.factory.disposeListeners();
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