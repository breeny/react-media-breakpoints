import React from 'react';
import renderer from 'react-test-renderer';
import Breakpoint from '../../src/Breakpoint';
import matchMediaMock from 'match-media-mock';

describe('Breakpoint Component', () => {

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

  describe('render', () => {
    it('uses named renders', () => {
      setMatchMediaMock(320);
      const renderMethod = jest.fn().mockReturnValue(null);
      renderer.create(<Breakpoint mobile={renderMethod}/>);
      expect(renderMethod).toBeCalled();
    });

    it('calls render if provided', () => {
      setMatchMediaMock(320);
      const renderMethod = jest.fn().mockReturnValue(null);
      renderer.create(<Breakpoint render={renderMethod}/>);
      expect(renderMethod).toBeCalled();
      expect(renderMethod).toBeCalledWith('mobile');
    });

    it('calls children if provided', () => {
      setMatchMediaMock(320);
      const renderMethod = jest.fn().mockReturnValue(null);
      renderer.create(<Breakpoint>{renderMethod}</Breakpoint>);
      expect(renderMethod).toBeCalled();
      expect(renderMethod).toBeCalledWith('mobile');
    });

    it('handles if no render props provided at all', () => {
      setMatchMediaMock(320);
      expect(() => {
        renderer.create(<Breakpoint />);
      }).not.toThrow();
    });
  });

  it('listens to breakpoint changes', () => {
    const mock = setMatchMediaMock(320);
    const renderMethod = jest.fn().mockReturnValue(null);
    renderer.create(<Breakpoint render={renderMethod}/>);
    renderMethod.mockReset();
    renderMethod.mockReturnValue(null);

    mock.setConfig({
      width: 1920
    });

    expect(renderMethod).toBeCalledWith('desktop');
  });

  it('creates singular queries', () => {
    setMatchMediaMock(999);
    const query = '(min-width: 998px) and (max-width: 1000px)';
    const renderMethod = jest.fn().mockReturnValue(null);
    renderer.create(<Breakpoint render={renderMethod} query={query} />);
    expect(renderMethod).toBeCalledWith('');
  });

  it('does not render if no match found', () => {
    setMatchMediaMock(1000);
    const query = '(min-width: 1001px)';
    const renderMethod = jest.fn().mockReturnValue(null);
    renderer.create(<Breakpoint render={renderMethod} query={query} />);
    expect(renderMethod).not.toBeCalled();
  });

  it('unmounts listeners', () => {
    const remove = jest.fn();
    window.matchMedia = () => ({
      matches: false,
      addListener: jest.fn(),
      removeListener: remove
    });

    const bp = renderer.create(<Breakpoint />);
    bp.unmount();

    expect(remove).toBeCalled();
  });
});