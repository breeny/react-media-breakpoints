import breakpoints from '../src/breakpoints';

describe('breakpoints configuration', () => {
  it('can be configured', () => {
    const newConfig = [{
      name: 'a',
      minWidth: 500,
    }, {
      name: 'b',
      maxWidth: 499
    }];

    breakpoints.configureBreakpoints(newConfig);
    const newBreakpoints = breakpoints.getBreakpoints();
    expect(newBreakpoints.every(bp => newConfig.find(c => c.name === bp.name))).toBe(true);
  });
});