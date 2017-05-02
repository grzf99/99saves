import React from 'react';
import { shallow } from 'enzyme';
import SignupStep1 from '../signup-step-1';
import { FormAlert } from '../../common/typography';

describe('<SignupStep1 />', () => {
  const onSubmit = jest.fn();
  describe('when isUserAvailable props is true', () => {
    it('should not render FormAlert', () => {
      const wrapper = shallow(
        <SignupStep1 isUserAvailable onSubmit={onSubmit} />
      );
      expect(wrapper.find(FormAlert).length).toEqual(0);
    });
  });

  describe('when isUserAvailable props is false', () => {
    it('should not render FormAlert', () => {
      const wrapper = shallow(
        <SignupStep1 isUserAvailable={false} onSubmit={onSubmit} />
      );
      expect(wrapper.find(FormAlert).length).toEqual(1);
    });
  });
});
