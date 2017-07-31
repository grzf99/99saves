import React from 'react';
import Modal from '../common/modal';
import LoginForm from './login-form';

export default ({ isAdmin, isProvider, submitText, onForgotPassword, ...cleanedProps }) => (
  <Modal {...cleanedProps} width="88%">
    <LoginForm
      isAdmin={isAdmin}
      isProvider={isProvider}
      submitText={submitText}
      onForgotPassword={onForgotPassword}
    />
  </Modal>
);
