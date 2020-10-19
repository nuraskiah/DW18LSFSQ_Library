import React, { createContext, useReducer } from 'react';

export const Context = createContext();

const initialState = {
  isLogin: false,
  isAdmin: false,
  user: {},
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isLogin: true,
        isLoading: false,
      };

    case 'GET_USER':
      let isAdmin = false;
      if (action.payload.role === 'admin') isAdmin = true;
      return {
        ...state,
        isLogin: true,
        isAdmin,
        user: action.payload,
        isLoading: false,
      };

    case 'AUTH_ERROR':
    case 'LOGIN_FAILED':
      return {
        ...state,
        isLogin: false,
        isLoading: false,
      };

    // case 'ADMIN':
    //   return {
    //     ...state,
    //     isAdmin: true,
    //     isLoading: false,
    //   };

    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isLogin: false,
        isAdmin: false,
        isLoading: false,
        // isAdmin: false,
      };

    default:
      throw new Error();
  }
};

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
