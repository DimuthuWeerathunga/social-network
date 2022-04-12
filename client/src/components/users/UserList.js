import { Row } from 'antd';
import React from 'react';
import UserCard from './UserCard';

const userList = [1, 2, 3, 4, 5, 6];

function UserList() {
  return (
    <Row
      gutter={[16, 16]}
      style={{ justifyContent: 'center', padding: '2rem 2rem 2rem 2rem' }}
    >
      {userList.map((user) => (
        <UserCard />
      ))}
    </Row>
  );
}

export default UserList;
