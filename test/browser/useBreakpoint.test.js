import React from 'react';
import renderer from 'react-test-renderer';
import matchMediaMock from 'match-media-mock';
import useBreakpoint from '../../src/useBreakpoint';

describe('useBreakpoint', () => {

  const HookComponent = ({ query, callback }) => {
    const breakpoint = useBreakpoint(query);
    callback(breakpoint);
    return null;
  }

  const setMatchMediaMock = (width) => {
    const mock = matchMediaMock.create();
    mock.setConfig({
      width
    });
    window.matchMedia = mock;
    return mock; 
  }

  afterEach(() => {
    window.matchMedia = undefined;
  })

  it('initialises with null', () => {
    const cb = jest.fn();
    renderer.create(<HookComponent callback={cb} />);
    expect(cb).toBeCalledWith(null);
  });

  it('matches media queries', () => {
    const cb = jest.fn();
    setMatchMediaMock(320);
    renderer.create(<HookComponent callback={cb} />);
    expect(cb).toBeCalledWith({
      name: 'mobile',
      query: expect.any(String),
    });
  });

  it('cleans up after itself', () => {
    const cb = jest.fn();
    setMatchMediaMock(320);
    const component = renderer.create(<HookComponent callback={cb} />);
    component.unmount();
  });

});