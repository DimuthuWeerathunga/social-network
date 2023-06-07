import React, { FC, ReactNode } from 'react';

import './BioSection.css';
import { TERTIARY_BG_COLOR } from '../../global-settings/colors';

const BioSection: FC = (config) => {
  return (
    <div
      className="bio-section-container"
      style={{ backgroundColor: TERTIARY_BG_COLOR }}
    >
      <p className="bio-title">Bio</p>
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
    </div>
  );
};

export default BioSection;
