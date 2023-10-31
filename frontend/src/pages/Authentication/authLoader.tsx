import { redirect } from 'react-router';
import useIsAuthenticated from './useIsAuthenticated';

interface AuthData {
  status: boolean;
  user: Object;
  err?: false;
}

export default async function authLoader() {
  const { status, user }: AuthData = await useIsAuthenticated();

  if (!status) {
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem('user', 'null');
    throw redirect('/login');
  }
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('user', JSON.stringify(user));
  return null;
}
