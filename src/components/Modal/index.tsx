import React, { useState, useEffect, ReactNode } from 'react';

import ReactModal, { Props } from 'react-modal';

interface IModalProps extends Props{
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, setIsOpen, ...rest }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '586px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
      {...rest}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
