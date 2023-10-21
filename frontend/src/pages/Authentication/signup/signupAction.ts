import { redirect } from 'react-router';
import { useSignUp } from '../../../hooks/useSignUp';

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
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('Unexpected error', err);
    }
  }
  return null;
}
