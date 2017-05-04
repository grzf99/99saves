import React from 'react';
import Toast from '../toast';
import { shallow } from 'enzyme';

describe('<Toast />', () => {
  describe('onFade prop', () => {
    const callback = jest.fn();

    describe('with show prop present', () => {
      it('should call after timer is done', () => {
        jest.useFakeTimers();
        const wrapper = shallow(
          <Toast onFade={callback} show={true} />
        );
        jest.runAllTimers();
        expect(callback).toBeCalled();
      });
    });

    describe('with no show prop set', () => {
      it('should call after timer is done', () => {
        jest.useFakeTimers();
        const callback = jest.fn();
        const wrapper = shallow(
          <Toast onFade={callback} />
        );
        jest.runAllTimers();
        expect(callback).not.toBeCalled();
      });
    });
  });
  describe('timer prop', () => {
    describe('with a specified value', () => {
      it('uses the specified timer', () => {
        jest.useFakeTimers();
        const wrapper = shallow(
          <Toast show={true} timer={1000} />
        );

        expect(setTimeout.mock.calls[0][1]).toBe(1000);
      });
    });
    describe('with no specified value', () => {
      it('defaults to 1500', () => {
        jest.useFakeTimers();
        const wrapper = shallow(
          <Toast show={true} />
        );

        expect(setTimeout.mock.calls[0][1]).toBe(1500);
      });
    });
  });
});
