import React, { useContext, useEffect } from 'react';
import UserList from '../form/components/UserList';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { FlashMessage, flashErrorMessage } from '../form/components/ErrorMessage';


const UserListPage = (props) => {
    const [state, dispatch] = useContext(UserContext);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get('http://localhost:8001/reviews/users/');
        dispatch({
          type: 'FETCH_USERS',
          payload: response.data.data || response.data, // in case pagination is disabled
        });
      };
      fetchData();
    }, [dispatch]);
  
    return (
      <div>
        <h1>List of Users</h1>
        {state.message.content && <FlashMessage message={state.message} />}
        <UserList users={state.users} />
    </div>
    );
  };
  
  export default UserListPage;
