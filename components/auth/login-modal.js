import React from 'react';
import styled from 'styled-components';
import Modal from '../common/modal';
import LoginForm from './login-form';
import { colors } from '../styles/variables';
import { Text } from '../common/typography';

const CloseButton = styled(Text)`
  position: absolute;
  font-size: 16px;
  color: ${colors.green};
  top: 19px;
  right: 19px;
  cursor: pointer;
`;

const ModalLoginContent = styled.div`
  > * + * {
    position: relative;
    height: auto;
    width: auto;
  }
`;

export default props => (
  <Modal {...props} isOpen={props.isOpen} width="400px">
    <ModalLoginContent>
      <CloseButton onClick={() => props.onClose()}>X</CloseButton>
      <LoginForm isAdmin={props.isAdmin} submitText={props.submitText} />
    </ModalLoginContent>
  </Modal>
);
