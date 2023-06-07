import React, { FC, useState } from 'react';
import { Input } from 'antd';

import { TERTIARY_BG_COLOR } from '../../global-settings/colors';
import './CredentialsSection.css';
import { EditOutlined } from '@ant-design/icons';
import EditModal from './EditModal';

const CredentialsSection: FC = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(1);

  const modalContents = [
    {
      confirmText: 'Next',
      content: (
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod, neque?
          Autem voluptate nam illo mollitia ducimus voluptatum sint vitae
          praesentium.
        </div>
      ),
    },
    {
      confirmText: 'Next',
      content: (
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          assumenda obcaecati deleniti! Excepturi voluptas molestias,
          consectetur similique recusandae eveniet cum.
        </div>
      ),
    },
    {
      confirmText: undefined,
      content: (
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, nulla.
          Voluptatibus, aliquam facere et modi ex est sapiente doloremque fuga?
        </div>
      ),
    },
  ];

  const openModalHandler = () => {
    setModalContent(1);
    setEditModalOpen(true);
  };

  const progressToNextHandler = () => {
    setModalContent((prevContent) => {
      if (prevContent < modalContents.length) {
        return prevContent + 1;
      } else {
        setEditModalOpen(false);
        return 1;
      }
    });
  };

  return (
    <div
      className="credentials-container"
      style={{ backgroundColor: TERTIARY_BG_COLOR }}
    >
      <div className="credential">
        <label htmlFor="email">
          Email <EditOutlined onClick={openModalHandler} />
        </label>
        <Input id="email" disabled placeholder="john@gmail.com"></Input>
      </div>
      <div className="credential">
        <label htmlFor="password">
          Password <EditOutlined onClick={openModalHandler} />
        </label>
        <Input id="password" disabled placeholder="********"></Input>
      </div>
      <EditModal
        open={editModalOpen}
        title="Edit The Bio"
        onOk={progressToNextHandler}
        closeModal={() => setEditModalOpen(false)}
        confirmText={modalContents[modalContent - 1].confirmText}
      >
        {modalContents[modalContent - 1].content}
      </EditModal>
    </div>
  );
};

export default CredentialsSection;
