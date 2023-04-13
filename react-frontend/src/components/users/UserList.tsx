import { Row } from 'antd';
import React, { FC } from 'react';
import UserCard from './UserCard';

const userList = [1, 2, 3, 4, 5, 6];

const UserList: FC = () => {
  return (
    <Row
      gutter={[16, 16]}
      style={{ justifyContent: 'center', padding: '2rem 2rem 2rem 2rem' }}
    >
      {userList.map((user,index) => (
        <UserCard key={index}/>
      ))}
    </Row>
  );
};

export default UserList;
