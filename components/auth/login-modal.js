import React from 'react';
import Modal from '../common/modal';
import LoginForm from './login-form';

export default ({ isAdmin, submitText, ...cleanedProps }) => (
  <Modal {...cleanedProps} width="400px">
    <LoginForm isAdmin={isAdmin} submitText={submitText} />
  </Modal>
);
