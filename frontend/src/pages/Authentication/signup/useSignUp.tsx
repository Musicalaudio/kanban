import axios from 'axios';

export const useSignUp = async (creds: any) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER}/auth/register`,
    JSON.stringify(creds),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );

  console.log(JSON.stringify(res));
  return JSON.stringify(res);
};
