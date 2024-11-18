import React from 'react';
import FirstRunScreen from "../src/screens/FirstRun/FirstRunScreen.js";

import renderer from "react-test-renderer";

describe("First run screens snapshots", () => {
  test("initial first run screen renders correctly", () => {
    const tree = renderer.create(<FirstRunScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
