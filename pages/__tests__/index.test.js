import React from 'react';
import { shallow } from 'enzyme';
import { Index, StyledCard } from '../index';
import SubscriptionConfirmationModal
  from '../../components/saves/subscription-confirmation-modal';

describe('<IndexPage />', () => {
  const saves = {
    rows: [
      {
        id: 1,
        slug: 'asd'
      }
    ]
  };
  const url = {
    query: {}
  };

  describe('when subscriptionConfirmationModalIsOpen is true', () => {
    it('should render the subscription confirmation modal', () => {
      const wrapper = shallow(<Index saves={saves} url={url} />);
      wrapper.setState({ subscriptionConfirmationModalIsOpen: true });
      const modal = wrapper.find(SubscriptionConfirmationModal);

      expect(modal.prop('isOpen')).toEqual(true);
    });
  });

  describe('when subscriptionConfirmationModalIsOpen is false', () => {
    it('should render the subscription confirmation modal', () => {
      const wrapper = shallow(<Index saves={saves} url={url} />);
      wrapper.setState({ subscriptionConfirmationModalIsOpen: false });
      const modal = wrapper.find(SubscriptionConfirmationModal);

      expect(modal.prop('isOpen')).toEqual(false);
    });
  });

  describe('when user clicks to subscribe', () => {
    it('should set subscriptionConfirmationModalIsOpen to true', () => {
      const wrapper = shallow(<Index saves={saves} url={url} />);
      const card = wrapper.find(StyledCard);
      card.prop('handleSubscribe')();

      expect(wrapper.state().subscriptionConfirmationModalIsOpen).toEqual(true);
    });

    it('should set currentSubscribeTarget to the clicked save id', () => {
      const wrapper = shallow(<Index saves={saves} url={url} />);
      const card = wrapper.find(StyledCard);
      card.prop('handleSubscribe')();

      expect(wrapper.state().currentSubscribeTarget).toEqual(1);
    });
  });

  describe('when subscription confirmation modal is closed', () => {
    it('should set subscriptionConfirmationModalIsOpen to false', () => {
      const wrapper = shallow(<Index saves={saves} url={url} />);
      wrapper.find(SubscriptionConfirmationModal).simulate('close');

      expect(wrapper.state().subscriptionConfirmationModalIsOpen).toEqual(
        false
      );
    });

    it('should set currentSubscribeTarget to null', () => {
      const wrapper = shallow(<Index saves={saves} url={url} />);
      wrapper.find(SubscriptionConfirmationModal).simulate('close');

      expect(wrapper.state().currentSubscribeTarget).toEqual(null);
    });
  });

  describe('when user subscription is confirmed on the modal', () => {
    const api = {
      post: jest.fn(() => Promise.resolve())
    };

    it('should post the subscription to the api', () => {
      const wrapper = shallow(<Index saves={saves} url={url} api={api} />);
      wrapper.find(SubscriptionConfirmationModal).simulate('confirm', 1);

      expect(api.post).toHaveBeenCalledWith('/saves/1/subscriptions');
    });
  });
});
