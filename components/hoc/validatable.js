import React, { Component, PropTypes } from 'react';
import isArray from 'lodash/isArray';
import { noop } from '../../utils';

export default (DecoratedComponent) => {
  class Validatable extends Component {
    static propTypes = {
      onChange: PropTypes.func.isRequired,
      validation: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func)
      ])
    };

    static defaultProps = {
      validation: noop
    };

    constructor(props) {
      super(props);
      this.state = {
        valid: true,
        dirty: false,
        validationMessage: '',
        value: ''
      };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ target }) {
      let valid = this.state.valid;
      this.setState({ dirty: true, value: target.value });

      if (this.props.validation && this.state.dirty) {
        const validationMessage = this.runValidations(target.value);
        valid = !validationMessage;
        this.setState({ valid, validationMessage });
      }

      this.props.onChange({
        target: {
          name: target.name,
          value: valid ? target.value : ''
        }
      });
    }

    runValidations(value) {
      const { validation } = this.props;
      if (isArray(validation)) {
        return validation.reduce((acc, fn) => {
          if (acc !== undefined) {
            return acc;
          }

          return fn(value);
        }, undefined);
      }

      return validation(value);
    }

    render() {
      const { validation, onChange, ...cleanedProps } = this.props;
      const { valid, validationMessage, value } = this.state;
      return (
        <DecoratedComponent
          {...cleanedProps}
          onChange={this.handleChange}
          valid={valid}
          validationMessage={validationMessage}
          value={value}
        />
      );
    }
  }

  return Validatable;
};
