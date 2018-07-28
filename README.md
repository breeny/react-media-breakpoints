# react-media-breakpoints
[![CircleCI](https://circleci.com/gh/breeny/react-media-breakpoints.svg?style=svg)](https://circleci.com/gh/breeny/react-media-breakpoints) [![Coverage Status](https://coveralls.io/repos/github/breeny/react-media-breakpoints/badge.svg?branch=master)](https://coveralls.io/github/breeny/react-media-breakpoints?branch=master) 

Simple matchMedia based React component to conditionally render components based on breakpoints.

### TL;DR
- :white_check_mark: No dependencies
- :white_check_mark: Small profile (4kb)
- :white_check_mark: Flexible API
- :white_check_mark: Customizable breakpoints

### Installation
```
  yarn add react-media-breakpoints
```

or

```
  npm install --save react-media-breakpoints
```


### Pre-configured Example

To use the pre-configured Breakpoints, just import and use the component. It will re-render when the matchMedia listener matches the new breakpoint. 

```javascript
//Import component
import Breakpoint from 'react-media-breakpoints'
...

//Use component based on breakpoints
<Breakpoint 
  desktop={() => (/* Render on desktop */)}
  tablet={() => (/* Render on tablet */)}
  mobile={() => (/* Render on mobile) */)}
/>

//It can also be used more generically with a render prop...
<Breakpoint
  render={(breakpoint) => (/* Conditionally render based on the render prop. Called with desktop, tablet, mobile */)}
/>

//...Or as a child function
<Breakpoint>
  {breakpoint => (/* Conditionally render here too :) */)}
</Breakpoint>
```

### Custom Configuration Example

Breakpoints can also be configured app wide by importing the configure method at the top of your App.js(x)

```javascript
//App.js
import { configure } from 'react-media-breakpoints';

configure([{
  name: 'customBp1',
  minWidth: 1000,
  maxWidth: 1100
}, {
  name: 'customBp2',
  minWidth: 1101
}, {
  name: 'customBp3',
  maxWidth: 999
}]);

//Elsewhere in your app
<Breakpoint 
  customBp1={() => (/* bp1 */)}
  customBp2={() => (/* bp2 */)}
  customBp3={() => (/* bp3 */)}
/>

<Breakpoint
  render={(breakpoint) => (/* called with customBp1, customBp2, customBp3 etc. */)}
/>
```

Note that configurations are shared across the app - it is advised to set up once and re-use these configurations across the app.

### Common Gotchas

*Custom config overlaps/misses pixel ranges*

In this scenario, `Breakpoint` will not call any render method - this is largely do to directly translating the config to media queries.

