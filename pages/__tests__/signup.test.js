import React from 'react';
import { shallow } from 'enzyme';
import { SignupPage } from '../signup';
import SignupStep1 from '../../components/auth/signup-step-1';
import SignupStep2 from '../../components/auth/signup-step-2';

describe('<Signup />', () => {
  const user = {
    email: 'asd@asd.com',
    password: '123'
  };
  const profile = { name: 'Thrall' };

  describe('on initialization', () => {
    it('should render SignupStep1', () => {
      const wrapper = shallow(<SignupPage />);

      expect(wrapper.state()).toEqual({ step: 1 });
      expect(wrapper.find(SignupStep1).length).toEqual(1);
    });
  });

  describe('when step is 2', () => {
    it('should render SignupStep2', () => {
      const wrapper = shallow(<SignupPage />);
      wrapper.setState({ step: 2 });

      expect(wrapper.find(SignupStep2).length).toEqual(1);
    });
  });

  describe('on step1 submit', () => {
    const isEmailAvailable = jest.fn();

    it('should check if email is available', () => {
      const wrapper = shallow(
        <SignupPage isEmailAvailable={isEmailAvailable} />
      );
      wrapper.find(SignupStep1).simulate('submit', user);

      expect(isEmailAvailable).toHaveBeenCalledWith(user.email);
    });

    it('should save user to state', () => {
      const wrapper = shallow(
        <SignupPage isEmailAvailable={isEmailAvailable} />
      );
      wrapper.find(SignupStep1).simulate('submit', user);

      expect(wrapper.state().user).toEqual(user);
    });
  });

  describe('on step 2 submit', () => {
    const signup = jest.fn();

    it('should call signup passing user and profile', () => {
      const wrapper = shallow(<SignupPage signup={signup} />);
      wrapper.setState({ user });
      wrapper.find(SignupStep2).simulate('submit', profile);

      expect(signup).toHaveBeenCalledWith({ ...user, profile });
    });
  });

  describe('on step 2 back', () => {
    it('should change step to 1 on state', () => {
      const wrapper = shallow(<SignupPage />);
      wrapper.setState({ step: 2 });
      wrapper.find(SignupStep2).simulate('back');

      expect(wrapper.state().step).toEqual(1);
    });
  });
});
