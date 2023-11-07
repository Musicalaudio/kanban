import axios from 'axios';
import createNewBoardAction from '../../components/new-board/createNewBoardAction';

export const dashboardAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  console.log(formData);
  const formID = formData.get('formID');
  try {
    switch (formID) {
      case 'create-new-board':
        const data = await createNewBoardAction(formData);
        console.log(`THIS IS THE ACTION DATA: ${data}`);
        return JSON.parse(data);
      default:
        console.log(formID);
        return null;
    }
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
