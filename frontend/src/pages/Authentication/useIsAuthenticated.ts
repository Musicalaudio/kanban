import axios from 'axios';

export default async function useIsAuthenticated() {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER}/auth/loggedIn`,
    { user: true },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  try {
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}
