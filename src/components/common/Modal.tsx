import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <DialogBox>{children}</DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: fixed;
  z-index: 100;
`;

const DialogBox = styled.dialog`
  width: 800px;
  height: 550px;
  display: flex;

  align-items: center;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10;
  flex-direction: column;
  margin-top: 0px;
`;

const Backdrop = styled.div`
  width: 150vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default Modal;
