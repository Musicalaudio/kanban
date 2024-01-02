// import { useState } from 'react';
import Modal from '../modal/Modal';
import Typography from '../../typography/Typography';
import Button from '../button/Button';
import { Form, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthContext from '../../pages/Authentication/useAuthContext';
import styles from './TaskModal.module.scss';
import btn from '../button/Button.module.scss';

interface props {
  modal: boolean;
  closeModal: () => void;
  taskID: Number;
  columnID: Number;
  taskTitle: string;
}

const DeleteTaskModal = ({
  modal,
  closeModal,
  taskID,
  columnID,
  taskTitle,
}: props) => {
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
  }, [board]);

  return (
    <Modal
      modal={modal}
      closeModal={closeModal}
      className={styles['delete-modal']}
    >
      <Typography tag="h2" variant="heading-l" className="red-text">
        Delete this task?
      </Typography>
      <Typography tag="p" variant="body-l">
        Are you sure you want to delete this '{taskTitle}' task? This action
        cannot be reversed.
      </Typography>
      <Form method="delete">
        <input hidden name="formID" defaultValue="delete-task" />
        <input
          hidden
          name="boardID"
          defaultValue={existingBoard ? existingBoard._id : undefined}
        />
        <input
          hidden
          name="columnID"
          defaultValue={columnID ? columnID.toString() : undefined}
        />
        <input
          hidden
          name="taskID"
          defaultValue={taskID ? taskID.toString() : undefined}
        />
        <div className={styles['delete-modal__btns']}>
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

export default DeleteTaskModal;
