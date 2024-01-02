import axios from 'axios';

const saveTaskModalAction = async (formData: FormData) => {
  console.log(formData);
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER}/boards/save-task-modal`,
    formData,
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  console.log(res);
  return JSON.stringify(res.data);
};

export default saveTaskModalAction;
