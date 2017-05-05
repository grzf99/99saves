import React from 'react';
import { shallow } from 'enzyme';
import SignupStep2 from '../signup-step-2';
import Form from '../../common/form';

describe('<SignupStep2 />', () => {
  const onSubmit = jest.fn();
  describe('onSubmit', () => {
    it('passes the profile data to onSubmit prop', () => {
      const state = {
        name: 'Jon Snow',
        cpf: '123.123.123-11',
        state: 'North',
        city: 'Winterfell'
      };
      const wrapper = shallow(<SignupStep2 onSubmit={onSubmit} />);
      wrapper.setState(state);
      wrapper.find(Form).simulate('submit');

      expect(onSubmit).toHaveBeenCalledWith(state);
    });
  });
});
