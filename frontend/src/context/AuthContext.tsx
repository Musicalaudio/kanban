import { ReactNode, createContext, useReducer } from 'react';

interface User {
  __v?: Number;
  _id?: String;
  email?: String;
  username?: String;
  authentication?: Object;
  createdAt?: String;
  updatedAt?: String;
  boards?: Array<any>;
}

interface stateInterface {
  user: User | null;
}

const initialState: stateInterface = { user: null };

interface Action {
  type: 'LOGIN' | 'LOGOUT' | 'ADD-COLUMN';
  payload: User | null;
}

export const authReducer = (state: stateInterface, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log(`LOGIN STATE: ${JSON.stringify(state)}`);
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
  const [state, dispatch] = useReducer<React.Reducer<stateInterface, Action>>(
    authReducer,
    initialState
  );

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
