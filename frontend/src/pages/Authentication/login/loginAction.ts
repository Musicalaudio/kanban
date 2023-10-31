import { redirect } from 'react-router-dom';
import { useSignIn } from './useSignIn';
import useAuthContext from '../useAuthContext';
import axios from 'axios';

interface Authentication {
  password: string;
  salt: string;
  sessionToken: string;
}

interface Data {
  authentication: Authentication;
  _id: string;
  username: string;
  email: string;
}

interface User {
  data: Data;
}

export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const pathname =
    new URL(request.url).searchParams.get('redirectTo') || '/dashboard';
  try {
    const data = await useSignIn({ email, password });
    // console.log('hi');
    console.log(`data: ${data}`);
    // const user: Data = JSON.parse(data);
    // console.log(`user: ${user}`);
    // localStorage.setItem('loggedIn', 'true');
    // localStorage.setItem('user', JSON.stringify(user));
    return redirect(pathname);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.message);
      return err.request.response;
    } else {
      console.log('Unexpected error', err);
      return 'Sorry, there was an unexpected error, please try again later';
    }
  }
}
