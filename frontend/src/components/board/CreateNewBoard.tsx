import styles from './CreateNewBoard.module.scss';
import Typography from '../../typography/Typography';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import { Form, useActionData } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CancellableInput from '../cancellable-input/CancellableInput';

interface NewBoard {
  closeModal: () => void;
  modal: Boolean;
}

const CreateNewBoard = ({ closeModal, modal }: NewBoard) => {
  const [columns, setColumns] = useState<Array<String>>([]);
  const actionData = useActionData();

  const addColumn = () => {
    const cancellableInput = '';
    setColumns([...columns, cancellableInput]);
  };

  useEffect(() => {
    if (actionData && actionData instanceof Object) {
      closeModal();
    }
  }, [actionData]);

  return (
    <Modal className="new-board" closeModal={closeModal} modal={modal}>
      <Form className={styles['new-board__form']} method="post">
        <Typography tag="h2" variant="l">
          Add New Board
        </Typography>
        <input hidden name="formID" defaultValue="create-board" />
        <fieldset>
          <label>Board Name</label>
          <input
            name="board-name"
            placeholder="e.g. Web Design"
            type="text"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="cancellable-input">Board Columns</label>
          {columns.map((_element, index) => {
            return (
              <React.Fragment key={`column-${index}`}>
                <CancellableInput
                  type="text"
                  index={index}
                  name={`column-${index}`}
                  inputList={columns}
                  setInputList={setColumns}
                  required
                />
              </React.Fragment>
            );
          })}

          <Button type="button" onClick={addColumn}>
            + Add New Column
          </Button>
        </fieldset>
        <Button type="submit">Create New Board</Button>
      </Form>
    </Modal>
  );
};

export default CreateNewBoard;
