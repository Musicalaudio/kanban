import axios from 'axios';

const deleteTaskAction = async (formData: FormData) => {
  console.log(formData.get('boardID'));
  console.log(formData.get('taskID'));
  let boardID = formData.get('boardID');
  let taskID = formData.get('taskID');
  let columnID = formData.get('columnID');
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER}/boards/delete-task`,
    { data: { boardID: boardID, taskID: taskID, columnID: columnID } }
  );
  console.log(res);
  return JSON.stringify(res.data);
};

export default deleteTaskAction;
