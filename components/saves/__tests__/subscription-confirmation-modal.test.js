import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../common/button';
import SubscriptionConfirmationModal, {
  InvisibleButon
} from '../subscription-confirmation-modal';

describe('<SubscriptionConfirmationModal />', () => {
  // describe('when InvisibleButton is clicked on step 1', () => {
  //   it('should close the modal', () => {
  //     const onClose = jest.fn();
  //     const onConfirm = jest.fn();
  //     const wrapper = shallow(
  //       <SubscriptionConfirmationModal
  //         onClose={onClose}
  //         onConfirm={onConfirm}
  //       />
  //     );
  //     wrapper.find(InvisibleButon).simulate('click');
  //
  //     expect(onClose).toHaveBeenCalled();
  //   });
  // });

  describe('when confirm button is clicked on step 1', () => {
    it('should confirm the subscription', () => {
      const onClose = jest.fn();
      const onConfirm = jest.fn();
      const wrapper = shallow(
        <SubscriptionConfirmationModal
          onClose={onClose}
          onConfirm={onConfirm}
        />
      );
      wrapper.find(Button).simulate('click');

      expect(onConfirm).toHaveBeenCalled();
    });

    it('should set step to 2', () => {
      const onClose = jest.fn();
      const onConfirm = jest.fn();
      const wrapper = shallow(
        <SubscriptionConfirmationModal
          onClose={onClose}
          onConfirm={onConfirm}
        />
      );
      wrapper.find(Button).simulate('click');

      expect(wrapper.state().step).toEqual(2);
    });
  });

  describe('when step 2 button is clicked', () => {
    it('should close the modal', () => {
      const onClose = jest.fn();
      const onConfirm = jest.fn();
      const wrapper = shallow(
        <SubscriptionConfirmationModal
          onClose={onClose}
          onConfirm={onConfirm}
        />
      );
      wrapper.setState({ step: 2 });
      wrapper.find(Button).simulate('click');

      expect(onClose).toHaveBeenCalled();
    });

    it('should reset the step to 1', () => {
      const onClose = jest.fn();
      const onConfirm = jest.fn();
      const wrapper = shallow(
        <SubscriptionConfirmationModal
          onClose={onClose}
          onConfirm={onConfirm}
        />
      );
      wrapper.setState({ step: 2 });
      wrapper.find(Button).simulate('click');

      expect(wrapper.state().step).toEqual(1);
    });
  });
});
