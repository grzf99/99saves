import React from 'react';
import { shallow } from 'enzyme';
import { Input, Field, MaskedField } from '../input';

describe('<Input />', () => {
  const onChange = jest.fn();
  describe('when it has a mask prop', () => {
    it('should render the MaskedField', () => {
      const wrapper = shallow(<Input onChange={onChange} mask="11/1111" />);
      expect(wrapper.find(MaskedField).length).toEqual(1);
    });
  });

  describe('when it does not have a mask property', () => {
    it('should render the Field', () => {
      const wrapper = shallow(<Input onChange={onChange} />);
      expect(wrapper.find(Field).length).toEqual(1);
    });
  });
});
