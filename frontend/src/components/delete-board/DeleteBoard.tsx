// import { useState } from 'react';
import Modal from '../modal/Modal';
import Typography from '../../typography/Typography';
import Button from '../button/Button';
import useDeleteBoard from './useDeleteBoard';

interface Props {
  modal: boolean;
  closeModal: () => void;
}

const DeleteBoard = ({ modal, closeModal }: Props) => {
  return (
    <Modal modal={modal} closeModal={closeModal}>
      <Typography tag="h2" variant="l">
        Delete this board?
      </Typography>
      <Typography tag="p" variant="m">
        Are you sure you want to delete this '
        {/*insert JS to refer to board name*/}' board? This action will remove
        all columns and tasks and cannot be reversed.
      </Typography>
      <div>
        <Button onClick={useDeleteBoard}>Delete</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default DeleteBoard;
