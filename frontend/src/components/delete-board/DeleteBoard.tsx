import Modal from '../modal/Modal';
import Typography from '../../typography/Typography';
import Button from '../button/Button';
import { Form, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthContext from '../../pages/Authentication/useAuthContext';
import styles from './../tasks/TaskModal.module.scss';
import btn from '../button/Button.module.scss';
interface Props {
  modal: boolean;
  closeModal: () => void;
}

const DeleteBoard = ({ modal, closeModal }: Props) => {
  const { state } = useAuthContext();
  const { board } = useParams();

  let existingBoard = state.user?.boards?.find(
    (obj) => obj.title === board?.split('-').join(' ')
  )
    ? state.user?.boards?.find(
        (obj) => obj.title === board?.split('-').join(' ')
      )
    : state.user?.boards?.slice(0, 1)[0];

  useEffect(() => {
    existingBoard = state.user?.boards?.find(
      (obj) => obj.title === board?.split('-').join(' ')
    )
      ? state.user?.boards?.find(
          (obj) => obj.title === board?.split('-').join(' ')
        )
      : state.user?.boards?.slice(0, 1)[0];

    closeModal();
  }, [board]);

  return (
    <Modal
      modal={modal}
      closeModal={closeModal}
      className={styles['delete-board']}
    >
      <Typography tag="h2" variant="heading-l" className="red-text">
        Delete this board?
      </Typography>
      <Typography tag="p" variant="body-l">
        Are you sure you want to delete this "{existingBoard?.title}" board?
        This action will remove all columns and tasks and cannot be reversed.
      </Typography>
      <Form method="delete">
        <input hidden name="formID" defaultValue="delete-board" />
        <input
          hidden
          name="boardID"
          defaultValue={existingBoard ? existingBoard._id : undefined}
        />
        <div className={styles['delete-board__btns']}>
          <Button
            type="submit"
            className={`${btn.btn} ${btn.btn__destructive}`}
          >
            Delete
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

export default DeleteBoard;
