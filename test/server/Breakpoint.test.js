import React from 'react';
import Breakpoint from "../../src/Breakpoint";
import renderer from "react-test-renderer";

describe("Breakpoint:SSR", () => {
  it("renders a server breakpoint", () => {
    const renderMethod = jest.fn().mockReturnValue(null);
    renderer.create(<Breakpoint server={renderMethod} />);
    expect(renderMethod).toBeCalled();
  });
});
