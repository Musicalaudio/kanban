import axios from 'axios';

const editTaskAction = async (formData: FormData) => {
  let id = formData.get('taskID');
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER}/boards/edit-task/${id}`,
    formData,
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  console.log(res);
  return JSON.stringify(res.data);
};

export default editTaskAction;
