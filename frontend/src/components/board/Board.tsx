import styles from './CreateNewBoard.module.scss';
import Typography from '../../typography/Typography';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import { Form, useActionData } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CancellableInput from '../cancellable-input/CancellableInput';

interface Props {
  closeModal: () => void;
  modal: Boolean;
  action: 'add' | 'edit';
}

interface formDetails {
  formTitle: string | undefined;
  formMethod: string | undefined;
  formButtonText: string | undefined;
}

const Board = ({ closeModal, modal, action }: Props) => {
  const [columns, setColumns] = useState<Array<String>>([]);
  const [_formDetails, setFormDetails] = useState<formDetails>({
    formTitle: undefined,
    formMethod: undefined,
    formButtonText: undefined,
  });
  const actionData = useActionData();

  const addColumn = () => {
    const cancellableInput = '';
    setColumns([...columns, cancellableInput]);
  };

  const initiateBoard = () => {
    switch (action) {
      case 'add':
        setFormDetails({
          formTitle: 'Add New Board',
          formMethod: 'post',
          formButtonText: 'Create New Board',
        });
        break;
      case 'edit':
        setFormDetails({
          formTitle: 'Edit Board',
          formMethod: 'put',
          formButtonText: 'Save Changes',
        });
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    initiateBoard();
  }, []);

  useEffect(() => {
    if (actionData && actionData instanceof Object) {
      closeModal();
    }
  }, [actionData]);

  return (
    <Modal className="board" closeModal={closeModal} modal={modal}>
      <Form className={styles['board__form']} method="post">
        <Typography tag="h2" variant="l">
          Add New Board
        </Typography>
        <input hidden name="formID" defaultValue={`${action}-board`} />
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

export default Board;
