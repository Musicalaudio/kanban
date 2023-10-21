import axios from 'axios';

export const useSignIn = async (creds: any) => {
  console.log(`BRUHHH ${JSON.stringify(creds)}`);

  const res = await axios.post(
    `${import.meta.env.VITE_SERVER}/auth/login`,
    JSON.stringify(creds),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );

  console.log(JSON.stringify(res));
  return JSON.stringify(res);
  const accessToken = res?.data?.authentication?.sessionToken;
};
