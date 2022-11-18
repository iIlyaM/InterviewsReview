import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';

const UserCard = ({ user }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="user outline" /> {user.user_id}
        </Card.Header>
        <Card.Description>
          <p>
            <Icon name="name" /> {user.user_name}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">
            Edit
          </Button>
          <Button basic color="red">
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

export default UserCard;