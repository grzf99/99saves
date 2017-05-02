import React from 'react';
import Input, { Field } from '../input';
import { shallow } from 'enzyme';
import { minLength } from '../../../utils/validation';

describe('<Input />', () => {
  describe('has no validation prop', () => {
    const onChange = jest.fn();
    const e = {
      target: {
        value: 'asdf'
      }
    };

    it('should always call onChange with the value', () => {
      const wrapper = shallow(<Input onChange={onChange} />);
      wrapper.find(Field).simulate('change', e);

      expect(onChange).toHaveBeenCalledWith(e);
    });

    it('should set state.valid to true', () => {
      const wrapper = shallow(<Input onChange={onChange} />);
      wrapper.find(Field).simulate('change', e);

      expect(wrapper.state().valid).toEqual(true);
    });
  });

  describe('has a validation prop', () => {
    describe('value is valid', () => {
      const onChange = jest.fn();
      const e = {
        target: {
          value: 'asdf'
        }
      };

      it('should call onChange with the value', () => {
        const wrapper = shallow(
          <Input onChange={onChange} validation={minLength(4)} />
        );
        wrapper.find(Field).simulate('change', e);

        expect(onChange).toHaveBeenCalledWith(e);
      });

      it('should set state.valid to true', () => {
        const wrapper = shallow(
          <Input onChange={onChange} validation={minLength(4)} />
        );
        wrapper.find(Field).simulate('change', e);

        expect(wrapper.state().valid).toEqual(true);
      });
    });

    describe('value is invalid', () => {
      const onChange = jest.fn();
      const e = {
        target: {
          value: 'as'
        }
      };

      it('should call onChange with empty value', () => {
        const wrapper = shallow(
          <Input onChange={onChange} validation={minLength(4)} />
        );
        wrapper.setState({ dirty: true });
        wrapper.find(Field).simulate('change', e);

        expect(onChange).toHaveBeenCalledWith({ target: { value: '' } });
      });

      it('should set state.valid to false', () => {
        const wrapper = shallow(
          <Input onChange={onChange} validation={minLength(4)} />
        );
        wrapper.setState({ dirty: true });
        wrapper.find(Field).simulate('change', e);

        expect(wrapper.state().valid).toEqual(false);
      });
    });
  });
});
