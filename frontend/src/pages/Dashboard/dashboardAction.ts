import axios from 'axios';
import createNewBoardAction from '../../components/board/createNewBoardAction';
import editBoardAction from '../../components/board/editBoardAction';
import createTask from '../../components/tasks/createTask';
import deleteBoardAction from '../../components/delete-board/deleteBoardAction';
import saveTaskModalAction from '../../components/tasks/saveTaskModalAction';
import deleteTaskAction from '../../components/tasks/deleteTaskAction';
import editTaskAction from '../../components/tasks/editTaskAction';
import logoutAction from '../../components/logout/logoutAction';
export const dashboardAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  console.log(formData);
  const formID = formData.get('formID');
  let data;
  try {
    switch (formID) {
      case 'create-board':
        data = await createNewBoardAction(formData);
        console.log(`THIS IS THE ACTION DATA: ${data}`);
        return JSON.parse(data);
      case 'edit-board':
        data = await editBoardAction(formData);
        console.log(`THIS IS THE ACTION DATA: ${data}`);
        return JSON.parse(data);
      case 'delete-board':
        data = await deleteBoardAction(formData);
        console.log(`THIS IS THE ACTION DATA: ${data}`);
        return JSON.parse(data);
      // case 'logout':
      //   data = await logoutAction(formData);
      //   console.log(`THIS IS THE ACTION DATA: ${data}`);
      //   return JSON.parse(data);
      case 'add-task':
        data = await createTask(formData);
        console.log(`THIS IS THE ACTION DATA: ${data}`);
        return JSON.parse(data);
      case 'save-task-modal':
        data = await saveTaskModalAction(formData);
        console.log(`THIS IS THE ACTION DATA: ${data}`);
        return JSON.parse(data);
      case 'edit-task':
        data = await editTaskAction(formData);
        console.log(`THIS IS THE ACTION DATA: ${data}`);
        return JSON.parse(data);
      case 'delete-task':
        data = await deleteTaskAction(formData);
        console.log(`THIS IS THE ACTION DATA: ${data}`);
        return JSON.parse(data);
      default:
        console.log(formID);
        return null;
    }
    //in each case, return user object so we can use a useEffect in Dashboard to update context whenever there is new actionData
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.request.response);
      return err.request.response;
    } else {
      console.log('Unexpected error', err);
      return 'Sorry, there was an unexpected error, please try again later';
    }
  }
};
