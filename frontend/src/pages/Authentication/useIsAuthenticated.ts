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
    // console.log(res.data);
    return { status: res.data.status, user: res.data.user };
  } catch (err) {
    console.log(`THIS IS THE ERROR ${err}`);
    return { status: false, user: {}, error: err };
  }
}
