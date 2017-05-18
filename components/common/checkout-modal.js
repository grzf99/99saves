import React from 'react';
import Modal from '../common/modal';
import CheckoutContent from './checkout-content';

const defaultWidth = "88%";

export default ({ submitText, ...cleanedProps, width, product }) => (
  <Modal {...cleanedProps} width={ width ? width : defaultWidth }>
    <CheckoutContent product={ product } />
  </Modal>
);
