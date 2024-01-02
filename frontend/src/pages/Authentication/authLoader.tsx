import { redirect } from 'react-router';
import useIsAuthenticated from './useIsAuthenticated';

interface AuthData {
  status?: boolean;
  user?: Object;
  err?: false;
}

export default async function authLoader() {
  console.log('TESTING');
  // if(localStorage.get)
  try {
    const { status, user }: AuthData = await useIsAuthenticated();
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch {
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem('user', 'null');
    throw redirect('/login');
  }

  // if (!status) {
  //   localStorage.setItem('loggedIn', 'false');
  //   localStorage.setItem('user', 'null');
  //   throw redirect('/login');
  // }
}
