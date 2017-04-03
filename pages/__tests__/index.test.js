/* global it, expect, describe */

import React from 'react';
import { shallow } from 'enzyme';
import App from '../index';

describe('With Enzyme', () => {
  it('App shows "Hello world!"', () => {
    const app = shallow(
      <App />,
    );

    expect(app.find('h1')).toBeDefined();
  });
});

// describe('With Snapshot Testing', () => {
//   it('App shows "Hello world!"', () => {
//     const component = renderer.create(<App />)
//     const tree = component.toJSON()
//     expect(tree).toMatchSnapshot()
//   })
// })
