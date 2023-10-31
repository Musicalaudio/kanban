import { AuthContext, DispatchContext } from '../../context/AuthContext';
import { useContext } from 'react';

const useAuthContext = () => {
  const context = useContext(AuthContext);
  const { dispatch } = useContext(DispatchContext);
  // if (!context) {
  //   throw Error('useAuthContext must be used inside an AuthContextProvider');
  // }
  return { context, dispatch };
};

export default useAuthContext;
