import React from 'react';
import Modal from 'react-modal';

const createModalStyles = (styleProps) => ({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
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
    padding: '36px',
    ...styleProps
  }
});

export default ({ children, isOpen, onClose, contentLabel, style, ...styleProps }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    onRequestClose={onClose}
    style={style || createModalStyles(styleProps)}
    contentLabel={contentLabel || 'Login'}
  >
    {children}
  </Modal>
);
