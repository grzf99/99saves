import React from 'react';
import Modal from '../common/modal';
import CheckoutContent from './checkout-content';

export default ({ submitText, ...cleanedProps, width, save }) => (
  <Modal {...cleanedProps} width="88%">
    <CheckoutContent save={ save } />
  </Modal>
);
