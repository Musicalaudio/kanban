import { ReactNode, createContext, useReducer } from 'react';
import React from 'react';

interface stateInterface {
  user: Object | null;
}

const initialState: stateInterface = { user: null };

interface Action {
  type: string;
  payload: string;
}

export const authReducer = (
  state: stateInterface,
  action: Action
): stateInterface => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContext = createContext<{ state: stateInterface }>({
  state: initialState,
});
export const DispatchContext = createContext<{
  dispatch: React.Dispatch<Action>;
}>({ dispatch: () => undefined });

// BELOW IS A CONCISE VERSION OF THE ABOVE CONTEXTS
/* export const AuthContext = createContext<{
   state: stateInterface;
   dispatch: React.Dispatch<Action>;
 }>({ state: initialState, dispatch: () => undefined }); */

interface authProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: authProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log('Authcontext state: ', state);

  return (
    // <AuthContext.Provider value={{ state, dispatch }}>
    <AuthContext.Provider value={{ state }}>
      <DispatchContext.Provider value={{ dispatch }}>
        {children}
      </DispatchContext.Provider>
    </AuthContext.Provider>
    // </AuthContext.Provider>
  );
};
