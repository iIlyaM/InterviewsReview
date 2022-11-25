import React, { useReducer, createContext } from 'react';


export const UserContext = createContext();

const initialState = {
  users: [],
  user: {}, // selected or new
  message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_USERS': {
      return {
        ...state,
        users: action.payload,
      };
    }
    case 'FETCH_USER': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'CREATE_USER': {
      return {
        ...state,
        users: [...state.users, action.payload],
        message: {
          type: 'success',
          title: 'Success',
          content: 'New User created!',
          },
      };
    }
    case 'UPDATE_USER': {
      console.log(action.payload);
      const {user} = action.payload;
      console.log('user', user);
      state.users.map(item => { console.log('map', item)});
      return {
        ...state,
        users: state.users.map(item =>
          item._id === user.user_id ? user : item,
        ),
        message: {
          type: 'success',
          title: 'Update Successful',
          content: `User has been updated!`,
        },
      };
    }
    case 'DELETE_USER': {
      const { _id } = action.payload;
      return {
        ...state,
        users: state.users.filter(item => item._id !== _id),
        message: {
          type: 'success',
          title: 'Delete Successful',
        },
      };
    }
    case 'FLASH_MESSAGE': {
      return {
        ...state,
        message: action.payload,
      };
    }
    default:
      throw new Error();
  }
}


export const UserContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};