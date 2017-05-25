import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { colors } from '../styles/variables';
import { Text } from './typography';

const createModalStyles = styleProps => ({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 99
  },
  content: {
    top: '50%',
    left: '20px',
    right: '20px',
    bottom: 'auto',
    border: '0',
    transform: 'translateY(-50%)',
    borderRadius: '0',
    margin: '0 auto',
    maxWidth: '400px',
    padding: '36px',
    ...styleProps
  }
});

const CloseButton = styled(Text)`
  position: absolute;
  font-size: 16px;
  color: ${colors.green};
  top: 19px;
  right: 19px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  > * + * {
    position: relative;
    height: auto;
    min-height: 300px;
    width: auto;

    @media (max-width: 568px) {
      min-height: 200px;
    }
  }
`;

export default ({
  children,
  isOpen,
  onClose,
  contentLabel,
  style,
  ...styleProps
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    onRequestClose={onClose}
    style={style || createModalStyles(styleProps)}
    contentLabel={contentLabel || 'Login'}
  >
    <ModalContent>
      <CloseButton onClick={onClose}>X</CloseButton>
      {children}
    </ModalContent>
  </Modal>
);
