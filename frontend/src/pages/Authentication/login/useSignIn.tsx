import axios from 'axios';

export const useSignIn = async (creds: any) => {
  console.log(import.meta.env.VITE_SERVER);
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER}/auth/login`,
    creds,
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  const data = res.data.authentication;
  console.log(JSON.stringify(data));
  return res.data;
};
