import { Form } from 'react-router-dom';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import CancellableInput from '../cancellable-input/CancellableInput';
import React, { useState } from 'react';
import Typography from '../../typography/Typography';
import styles from './EditBoard.module.scss';

interface Props {
  modal: Boolean;
  closeModal: () => void;
}

const EditBoard = ({ closeModal, modal }: Props) => {
  const [columns, setColumns] = useState<Array<String>>([]);

  const addColumn = () => {
    const cancellableInput = '';
    setColumns([...columns, cancellableInput]);
  };

  return (
    <Modal className="edit-board" closeModal={closeModal} modal={modal}>
      <Form className={styles['edit-board__form']} method="post">
        <Typography tag="h2" variant="l">
          Edit Board
        </Typography>
        <input hidden name="formID" defaultValue="edit-board" />
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
        <Button type="submit">Save Changes</Button>
      </Form>
    </Modal>
  );
};

export default EditBoard;
