import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const useAuthContext = () => {
  const { state, dispatch } = useContext(AuthContext);

  return { state, dispatch };
};

export default useAuthContext;
