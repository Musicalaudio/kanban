import { redirect } from 'react-router-dom';
import { useSignIn } from '../../../hooks/useSignIn';

export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const pathname =
    new URL(request.url).searchParams.get('redirectTo') || '/dashboard';
  try {
    const data = await useSignIn({ email, password });
    console.log(`data: ${data}`);
    localStorage.setItem('loggedIn', 'true');
    return redirect(pathname);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('Unexpected error', err);
    }
  }
}
