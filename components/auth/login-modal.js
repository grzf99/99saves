import React from 'react';
import Modal from '../common/modal';
import LoginForm from './login-form';

export default ({ isAdmin, submitText, onForgotPassword, ...cleanedProps }) => (
  <Modal {...cleanedProps}>
    <LoginForm
      isAdmin={isAdmin}
      submitText={submitText}
      onForgotPassword={onForgotPassword}
    />
  </Modal>
);
