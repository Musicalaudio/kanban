import { redirect } from 'react-router-dom';
import { useSignIn } from './useSignIn';
import axios from 'axios';

export const loginAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const pathname =
    new URL(request.url).searchParams.get('redirectTo') || '/dashboard';
  try {
    const data = await useSignIn({ email, password });
    console.log(`data: ${data}`);
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
};
