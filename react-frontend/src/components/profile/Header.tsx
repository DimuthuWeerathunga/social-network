import React, { FC } from 'react';

import profilePic from '../../assets/230x230-avatar-dummy-profile-pic.jpg';
import './Header.css';
import { TERTIARY_BG_COLOR } from '../../global-settings/colors';

const Header: FC = () => {
  return (
    <div
      className="header-container"
      style={{ backgroundColor: TERTIARY_BG_COLOR }}
    >
      <img src={profilePic} alt="Image is not loaded" />
      <p className="name">John Doe fheiwonfgewo oigjewogne</p>
    </div>
  );
};

export default Header;
