import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import { UserContext } from '../../context/UserContext';
import  { flashErrorMessage }  from  './ErrorMessage';
import  axios  from  'axios';

const  { useContext }  =  React;

const UserCard = ({ user }) => {

  const [state, dispatch] = useContext(UserContext);

  const deleteUser = async id => {
    try {
      const response = await axios.delete(
        `http://localhost:8001/reviews/users/${id}`,
      );
      dispatch({
        type: 'DELETE_USER',
        payload: response.data,
      });
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

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
          <Button basic color="red" onClick={() => deleteUser(user.user_id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

export default UserCard;