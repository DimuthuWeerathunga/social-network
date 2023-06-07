import { Modal } from 'antd';
import React, { FC, ReactNode, useState } from 'react';

interface ModalProps {
  open: boolean;
  title: string;
  closeModal: () => void;
  children: ReactNode;
  onOk: () => void;
  confirmText: string | undefined;
}

const EditModal: FC<ModalProps> = ({
  open,
  title,
  closeModal,
  children,
  onOk,
  confirmText,
}) => {
  if (!confirmText) {
    return (
      <Modal
        title={title}
        centered
        open={open}
        onOk={onOk}
        onCancel={closeModal}
        footer={null}
      >
        {children}
      </Modal>
    );
  }
  return (
    <Modal
      title={title}
      centered
      open={open}
      onOk={onOk}
      onCancel={closeModal}
      okText={confirmText}
    >
      {children}
    </Modal>
  );
};

export default EditModal;
