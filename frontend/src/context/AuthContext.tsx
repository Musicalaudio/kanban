import { ReactNode, createContext, useReducer } from 'react';

interface stateInterface {
  user: Object | null;
}

const initialState: stateInterface = { user: null };

interface Action {
  type: 'LOGIN' | 'LOGOUT';
  payload: stateInterface;
}

export const authReducer = (state: stateInterface, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log(`LOGIN PAYLOAD: ${JSON.stringify(action.payload)}`);
      return { user: action.payload };
    case 'LOGOUT':
      console.log(`LOGOUT PAYLOAD: ${JSON.stringify(action.payload)}`);
      return { user: null };
    default:
      console.log(`DEFAULT PAYLOAD: ${JSON.stringify(action.payload)}`);
      return state;
  }
};

export const AuthContext = createContext<{
  state: stateInterface;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });

interface authProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: authProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log('Authcontext state: ', state);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
