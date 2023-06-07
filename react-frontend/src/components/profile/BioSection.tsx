import React, { FC, ReactNode, useState } from 'react';

import './BioSection.css';
import { TERTIARY_BG_COLOR } from '../../global-settings/colors';
import { EditOutlined } from '@ant-design/icons';
import EditModal from './EditModal';

const BioSection: FC = (config) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <div
      className="bio-section-container"
      style={{ backgroundColor: TERTIARY_BG_COLOR }}
    >
      <p className="bio-title">
        Bio <EditOutlined onClick={() => setEditModalOpen(true)}></EditOutlined>
      </p>
      <p className="bio-description">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et ipsam
        deleniti quod voluptatum, sapiente atque repudiandae, harum labore
        temporibus voluptatibus voluptates nemo cum nostrum voluptas laboriosam?
        Repellendus inventore totam incidunt dolorum, veniam vitae assumenda
        repudiandae saepe optio impedit, temporibus libero sed eum quam maxime
        quas eveniet iusto suscipit fuga dolorem vero? Iusto sequi consequuntur
        ex, dolore, ipsum maxime cupiditate eius alias, in asperiores vitae
        molestiae eligendi iste autem. Harum, impedit? Quia veniam rerum
        perspiciatis earum.
      </p>
      <EditModal
        open={editModalOpen}
        title="Edit The Bio"
        onOk={() => setEditModalOpen(false)}
        closeModal={() => setEditModalOpen(false)}
        confirmText="OK"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
          inventore sed laboriosam cupiditate. Modi itaque dolores corporis?
          Sint consectetur libero nihil quam quas, expedita cupiditate quo totam
          vitae voluptas dolor.
        </p>
      </EditModal>
    </div>
  );
};

export default BioSection;
