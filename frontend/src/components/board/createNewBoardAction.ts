import axios from 'axios';

const createNewBoardAction = async (formData: FormData) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER}/boards/create-board`,
    formData,
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );
  return JSON.stringify(res.data);
};

export default createNewBoardAction;
