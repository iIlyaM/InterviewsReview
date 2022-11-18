import React from 'react';
import { Card } from 'semantic-ui-react';
import UserCard from './UserCard';

const UserList = ({ users }) => {
  const cards = () => {
    return users.map(user => {
      return <UserCard key={user._id} user={user} />;
    });
  };

  return <Card.Group>{cards()}</Card.Group>;
}

export default UserList;