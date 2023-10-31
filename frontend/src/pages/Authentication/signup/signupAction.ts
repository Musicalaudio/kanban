import { redirect } from 'react-router';
import { useSignUp } from './useSignUp';
import axios from 'axios';

export async function signupAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');
  try {
    const data = await useSignUp({ username, email, password });
    console.log(`data: ${data}`);
    const pathname =
      new URL(request.url).searchParams.get('redirectTo') || '/login';
    return redirect(pathname);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.request.response);
      return err.request.response;
    } else {
      console.log('Unexpected error', err);
      return 'Sorry, there was an unexpected error, please try again later';
    }
  }
}
