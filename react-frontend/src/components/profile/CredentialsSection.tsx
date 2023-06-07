import React, { FC } from 'react';

import './CredentialsSection.css';

const CredentialsSection: FC = () => {
  return (
    <div className="credentials-container">
      <div className="email"></div>
      <div className="password"></div>
    </div>
  );
};

export default CredentialsSection;
