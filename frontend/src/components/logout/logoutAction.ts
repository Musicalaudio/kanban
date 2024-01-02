import axios from 'axios';

const logoutAction = async (_formData: FormData) => {
  const res = await axios.post(`${import.meta.env.VITE_SERVER}/auth/logout`);
  return JSON.stringify(res.data);
};

export default logoutAction;
