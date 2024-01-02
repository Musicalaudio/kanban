import axios from 'axios';

const createTask = async (formData: FormData) => {
  console.log(formData);
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER}/boards/create-task`,
    formData,
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  console.log(res);
  return JSON.stringify(res.data);
};

export default createTask;
