
import React, { useContext } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import { UserContext } from '../context/UserContext';
import { Redirect } from 'react-router-dom';

const UserListForm = () => {
  const [state] = useContext(UserContext);
  const { register, errors, handleSubmit } = useForm();
  const [redirect, setRedirect] = useState(false);


  const createUser = async data => {
    try {
      const response = await axios.post('http://localhost:8001/reviews/users/superuser/new_user/${role}', data);
      dispatch({
        type: 'CREATE_USER',
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const onSubmit = async data => {
    await createUser(data);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  
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
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  ref={register({ required: true, minLength: 2 })}
                />
              </label>
              <span className="error">
                {errors.name &&
                  errors.name.first.type === 'required' &&
                  'You need to provide First Name'}
              </span>
              <span className="error">
                {errors.name &&
                  errors.name.type === 'minLength' &&
                  'Must be 2 or more characters'}
              </span>
            </Form.Field>
          </Form.Group>
          <Form.Field className={classnames({ error: errors.email })}>
            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                ref={register({
                  required: true,
                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                })}
              />
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
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
            </label>
          </Form.Field>
          <Form.Field className={classnames({ error: errors.role })}>
            <label htmlFor="password">
              Role
              <input
                id="role"
                name="role"
                type="role"
                placeholder="role"
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