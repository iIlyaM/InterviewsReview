
import React, { useContext, useState } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import { UserContext } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';
import { flashErrorMessage } from './ErrorMessage';
import  axios  from  'axios';

const UserListForm = () => {
  const [state, dispatch] = useContext(UserContext);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [navigate, setNavigate] = useState(false);


  const createUser = async data => {
    try {
      const response = await axios.post(`http://localhost:8001/reviews/users/superuser/new_user`, data);
      dispatch({
        type: 'CREATE_USER',
        payload: response.data,
      });
      setNavigate(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const onSubmit = async data => {
    console.log(data);
    await createUser(data);
  };

  if (navigate) {
    return <Navigate to="/" />;
  }

  console.log(errors);
  
  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <h1 style={{ marginTop: '1em' }}>Add New User</h1>
        <Form onSubmit={handleSubmit(onSubmit)} loading={state.loading}>
          <Form.Group widths="equal">
            <Form.Field className={classnames({ error: errors.name })}>
              <label htmlFor="name">
                Name
                <input 
                type="text"
                placeholder="Name"
                 {...register('name',
                  { required: true,
                   minLength: 2})} />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Field className={classnames({ error: errors.email })}>
            <label htmlFor="email">
              Email
              <input 
              type="email" 
              placeholder="Email"
              {...register('email',
               { required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/}
                 )} />
            </label>
            <span className="error">
              {errors.email &&
                errors.email.type === 'required' &&
                'You need to provide an Email address'}
            </span>
            <span className="error">
              {errors.email &&
                errors.email.type === 'pattern' &&
                'Invalid email address'}
            </span>
          </Form.Field>
          <Form.Field className={classnames({ error: errors.password })}>
            <label htmlFor="password">
              Password
              <input
                type="text"
                placeholder="Password"
                {...register('password',
                  { required: true,
                   minLength: 0})}
              />
            </label>
          </Form.Field>
          <Form.Field className={classnames({ error: errors.role })}>
            <label htmlFor="password">
              Role
              <input
                type="text"
                placeholder="role"
                {...register('role',
                  { required: true,
                   minLength: 0})}
              />
            </label>
          </Form.Field>
          <Button primary type="submit">
            Save
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default UserListForm;