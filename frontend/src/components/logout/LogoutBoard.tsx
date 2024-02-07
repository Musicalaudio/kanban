import { Form, redirect } from 'react-router-dom';
import Modal from '../modal/Modal';
import Typography from '../../typography/Typography';
import Button from '../button/Button';
import btn from '../button/Button.module.scss';
import styles from './../tasks/TaskModal.module.scss';
import { useActionData } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthContext from '../../pages/Authentication/useAuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface Props {
  modal: boolean;
  closeModal: () => void;
}

const LogoutBoard = ({ modal, closeModal }: Props) => {
  // const logoutActionData = useActionData();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log('IS THIS BEING CALLED?', logoutActionData);
  //   dispatch({
  //     type: 'LOGOUT',
  //     payload: null,
  //   });
  // }, [logoutActionData]);

  const logout = async () => {
    const res = await axios.post(`${import.meta.env.VITE_SERVER}/auth/logout`);
    if (res) {
      dispatch({
        type: 'LOGOUT',
        payload: null,
      });
    }
    navigate('/login');
  };

  return (
    <Modal
      modal={modal}
      closeModal={closeModal}
      className={styles['logout-modal']}
    >
      <Typography tag="h2" variant="heading-l" className="red-text">
        Delete this board?
      </Typography>
      <Typography tag="p" variant="body-l">
        Are you sure you want to logout? You will be redirected to the log-in
        page and will have to log in again if you want to access any of these
        boards again.
      </Typography>
      <Form method="post">
        <input hidden name="formID" defaultValue="logout" />
        <div className={styles['delete-board__btns']}>
          <Button
            type="button"
            onClick={logout}
            className={`${btn.btn} ${btn.btn__destructive}`}
          >
            Logout
          </Button>
          <Button
            onClick={closeModal}
            className={`${btn.btn} ${btn.btn__secondary}`}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default LogoutBoard;
