import React, { createContext, useReducer } from 'react';

export const Context = createContext();

const initialState = {
  isLogin: false || localStorage.getItem('isLogin'),
  isAdmin: false || localStorage.getItem('isAdmin'),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('isLogin', true);
      return {
        ...state,
        isLogin: true,
      };

    case 'ADMIN':
      localStorage.setItem('isAdmin', true);
      return {
        ...state,
        isAdmin: true,
      };

    case 'LOGOUT':
      localStorage.removeItem('isLogin');
      localStorage.removeItem('isAdmin');
      return {
        ...state,
        isLogin: false,
        isAdmin: false,
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
