import axios from 'axios';

const deleteBoardAction = async (formData: FormData) => {
  console.log(formData.get('boardID'));
  let id = formData.get('boardID');
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER}/boards/delete-board/${id}`
  );
  console.log(res);
  return JSON.stringify(res.data);
};

export default deleteBoardAction;
