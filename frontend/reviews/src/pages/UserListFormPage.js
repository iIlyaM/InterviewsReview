import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserListForm from '../form/components/UserListForm';
import { flashErrorMessage } from '../form/components/ErrorMessage';
import { UserContext } from '../context/UserContext';
import { useParams } from "react-router-dom";



const UserListFormPage = () => {
  const [state, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { _id } = useParams();
  //  `http://localhost:8001/reviews/users/${_id}`,

  useEffect(() => {

    if (_id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8001/reviews/users/${_id}`,
          );
          dispatch({
            type: 'FETCH_USER',
            payload: response.data,
          });
          setLoading(false);
        } catch (error) {
          flashErrorMessage(dispatch, error);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, [_id, dispatch]);

  if (loading) {
    return <p>Please wait...</p>;
  }

  return (
    <div>
      <UserListForm user={state.user} />
    </div>
  );
}

export default UserListFormPage;