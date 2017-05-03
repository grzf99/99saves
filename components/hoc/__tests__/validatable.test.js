import React from 'react';
import { shallow } from 'enzyme';
import validatable from '../validatable';
import { required, minLength } from '../../../utils/validation';

const Component = validatable(props => <input {...props} />);

describe('has no validation prop', () => {
  const onChange = jest.fn();
  const e = {
    target: {
      value: 'asdf'
    }
  };

  it('should always call onChange with the value', () => {
    const wrapper = shallow(<Component onChange={onChange} />);
    wrapper.simulate('change', e);

    expect(onChange).toHaveBeenCalledWith(e);
  });

  it('should set state.valid to true', () => {
    const wrapper = shallow(<Component onChange={onChange} />);
    wrapper.simulate('change', e);

    expect(wrapper.state().valid).toEqual(true);
  });
});

describe('has a single validation function', () => {
  describe('value is valid', () => {
    const onChange = jest.fn();
    const e = {
      target: {
        value: 'asdf'
      }
    };

    it('should call onChange with the value', () => {
      const wrapper = shallow(
        <Component onChange={onChange} validation={minLength(4)} />
      );
      wrapper.simulate('change', e);

      expect(onChange).toHaveBeenCalledWith(e);
    });

    it('should set state.valid to true', () => {
      const wrapper = shallow(
        <Component onChange={onChange} validation={minLength(4)} />
      );
      wrapper.simulate('change', e);

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
        <Component onChange={onChange} validation={minLength(4)} />
      );
      wrapper.setState({ dirty: true });
      wrapper.simulate('change', e);

      expect(onChange).toHaveBeenCalledWith({ target: { value: '' } });
    });

    it('should set state.valid to false', () => {
      const wrapper = shallow(
        <Component onChange={onChange} validation={minLength(4)} />
      );
      wrapper.setState({ dirty: true });
      wrapper.simulate('change', e);

      expect(wrapper.state().valid).toEqual(false);
    });
  });
});

describe('has multiple validation functions', () => {
  describe('one of the validations fail', () => {
    const onChange = jest.fn();
    const e = {
      target: {
        value: ''
      }
    };

    it('should call onChange with empty value', () => {
      const wrapper = shallow(
        <Component onChange={onChange} validation={[required, minLength(4)]} />
      );
      wrapper.setState({ dirty: true });
      wrapper.simulate('change', e);

      expect(onChange).toHaveBeenCalledWith({ target: { value: '' } });
    });

    it('should set state.valid to false', () => {
      const wrapper = shallow(
        <Component onChange={onChange} validation={[required, minLength(4)]} />
      );
      wrapper.setState({ dirty: true });
      wrapper.simulate('change', e);

      expect(wrapper.state().valid).toEqual(false);
    });
  });

  describe('all validations pass', () => {
    const onChange = jest.fn();
    const e = {
      target: {
        value: 'asdf'
      }
    };

    it('should call onChange with the value', () => {
      const wrapper = shallow(
        <Component onChange={onChange} validation={[required, minLength(4)]} />
      );
      wrapper.simulate('change', e);

      expect(onChange).toHaveBeenCalledWith(e);
    });

    it('should set state.valid to true', () => {
      const wrapper = shallow(
        <Component onChange={onChange} validation={[required, minLength(4)]} />
      );
      wrapper.simulate('change', e);

      expect(wrapper.state().valid).toEqual(true);
    });
  });
});
