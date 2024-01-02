import axios from 'axios';

const editBoardAction = async (formData: FormData) => {
  console.log(formData);
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER}/boards/edit-board`,
    formData,
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  console.log(res);
  return JSON.stringify(res.data);
};

export default editBoardAction;
