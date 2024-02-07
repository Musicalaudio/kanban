import styles from './CreateNewBoard.module.scss';
import Typography from '../../typography/Typography';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import { Form, useActionData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CancellableInput from '../cancellable-input/CancellableInput';
import { v4 as uuidv4 } from 'uuid';
import typography from '../../typography/typography.module.scss';
import btn from '../button/Button.module.scss';
import label from '../modal/Modal.module.scss';
import useAuthContext from '../../pages/Authentication/useAuthContext';
interface NewBoard {
  closeModal: () => void;
  modal: Boolean;
}

const CreateNewBoard = ({ closeModal, modal }: NewBoard) => {
  const [columns, setColumns] = useState<Array<any>>([]);
  const actionData: any = useActionData();
  const { dispatch } = useAuthContext();

  const [boardError, setBoardError] = useState<string>();
  const [columnError, setColumnError] = useState<string>();

  const addColumn = () => {
    setColumns((state: any) => [...state, { name: '', clientID: uuidv4() }]);
  };

  useEffect(() => {
    if (actionData && actionData instanceof Object) {
      dispatch({
        type: 'LOGIN',
        payload: actionData as any,
      });
      closeModal();
    } else {
      // console.log(actionData);
      // let newError = actionData ? JSON.parse(actionData?.slice(7).trim()) : '';
      let substrError = actionData
        ? actionData.substring(0, 7).trim() === 'Error:'
        : 'ERROR';
      let substrA = actionData ? actionData.substring(0, 7) : 'no';

      if (actionData?.substring(0, 7).trim() === 'Error:') {
        let newError = actionData
          ? JSON.parse(actionData?.slice(7).trim())
          : '';
        if (newError['boardError']) {
          setBoardError(newError['boardError']);
          setColumnError(undefined);
        } else if (newError['columnError']) {
          setColumnError(newError['columnError']);
          setBoardError(undefined);
        }
      }
    }
  }, [actionData]);

  return (
    <Modal className="new-board" closeModal={closeModal} modal={modal}>
      <Form className={`${styles['new-board__form']}`} method="post">
        <Typography tag="h2" variant="heading-l">
          Add New Board
        </Typography>
        <input hidden name="formID" defaultValue="create-board" />
        <fieldset>
          <label className={typography['body-m']}>
            <Typography variant="body-m" tag="p">
              Board Name
            </Typography>{' '}
            <span className={`${label['label-error']}`}>
              {boardError ? `${boardError}` : ''}
            </span>
          </label>
          <input
            name="board-name"
            placeholder="e.g. Web Design"
            type="text"
            required
          />
        </fieldset>
        <fieldset className={styles['board-columns']}>
          <label htmlFor="cancellable-input" className={typography['body-m']}>
            {' '}
            <Typography variant="body-m" tag="p">
              Board Columns{' '}
            </Typography>
            <span className={`${label['label-error']}`}>
              {columnError ? `${columnError}` : ''}
            </span>
          </label>
          {columns.map((el, index) => {
            return (
              <CancellableInput
                key={el.clientID}
                columnID={el.clientID}
                type="text"
                index={index}
                name={`column-${index}`}
                inputList={columns}
                setInputList={setColumns}
                value={el.value}
                required
              />
            );
          })}

          <Button
            type="button"
            onClick={addColumn}
            className={`${btn.btn} ${btn['btn__secondary']}`}
          >
            + Add New Column
          </Button>
        </fieldset>
        <Button type="submit" className={`${btn.btn} ${btn['btn__primary']}`}>
          Create New Board
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateNewBoard;
