import React from 'react';
import renderer from 'react-test-renderer';
import Breakpoint from '../src/Breakpoint';
import matchMediaMock from 'match-media-mock';

describe('Breakpoint Component', () => {

  const setMatchMediaMock = (width) => {
    const mock = matchMediaMock.create();
    mock.setConfig({
      width
    });
    window.matchMedia = mock;
  }

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
  });

  describe('matches', () => {
    
  });
});