import axios from 'axios';

// interface Authentication {
//   password: string;
//   salt: string;
//   sessionToken: string;
// }

// interface User {
//   authentication: Authentication;
//   _id: string;
//   username: string;
//   email: string;
// }

export const useSignIn = async (creds: any) => {
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
