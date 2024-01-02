import { Form, useActionData, useParams } from 'react-router-dom';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import CancellableInput from '../cancellable-input/CancellableInput';
import { useEffect, useState } from 'react';
import Typography from '../../typography/Typography';
import styles from './EditBoard.module.scss';
import useAuthContext from '../../pages/Authentication/useAuthContext';
import { v4 as uuidv4 } from 'uuid';
import btn from '../button/Button.module.scss';
import typography from '../../typography/typography.module.scss';
import auth from '../../pages/Authentication/Authentication.module.scss';

interface Props {
  modal: Boolean;
  closeModal: () => void;
  columns: Array<any>;
}

const EditBoard = ({ closeModal, modal, columns }: Props) => {
  const { board } = useParams();
  const { state, dispatch } = useAuthContext();
  const [boardError, setBoardError] = useState<string>();
  const [columnError, setColumnError] = useState<string>();
  let actionData: any = useActionData();

  let existingBoard = state.user?.boards?.find(
    (obj) => obj.title === board?.split('-').join(' ')
  )
    ? state.user?.boards?.find(
        (obj) => obj.title === board?.split('-').join(' ')
      )
    : state.user?.boards?.slice(0, 1)[0];

  const [localColumns, setLocalColumns] = useState<Array<any>>(
    state.user?.boards?.find((obj) => obj.title === board?.split('-').join(' '))
      ? state.user?.boards?.find(
          (obj) => obj.title === board?.split('-').join(' ')
        ).columns
      : state.user?.boards?.slice(0, 1)[0].columns
  );

  useEffect(() => {
    if (actionData && actionData instanceof Object) {
      closeModal();
    } else {
      console.log('THIS JSON: ' + JSON.stringify(actionData));
      console.log('THIS JSON: ' + typeof JSON.stringify(actionData));
      let substrError = actionData
        ? actionData.substring(0, 7).trim() === 'Error:'
        : 'ERROR';
      let substrA = actionData ? actionData.substring(0, 7) : 'no';
      console.log(`substr ${substrError}`);
      console.log(`substr ${substrA}`);
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

  useEffect(() => {
    existingBoard = state.user?.boards?.find(
      (obj) => obj.title === board?.split('-').join(' ')
    )
      ? state.user?.boards?.find(
          (obj) => obj.title === board?.split('-').join(' ')
        )
      : state.user?.boards?.slice(0, 1)[0];
    setLocalColumns(
      state.user?.boards?.find(
        (obj) => obj.title === board?.split('-').join(' ')
      )
        ? state.user?.boards?.find(
            (obj) => obj.title === board?.split('-').join(' ')
          ).columns
        : state.user?.boards?.slice(0, 1)[0].columns
    );
  }, [state]);

  const addColumn = () => {
    setLocalColumns((state: any) => [
      ...state,
      { name: '', clientID: uuidv4() },
    ]);
  };

  console.log(
    'COLUMNS: ',
    state.user?.boards?.find((obj) => obj.title === board?.split('-').join(' '))
      ? state.user?.boards?.find(
          (obj) => obj.title === board?.split('-').join(' ')
        ).columns
      : state.user?.boards?.slice(0, 1)[0].columns
  );
  console.log('LOCAL COLUMNS: ', localColumns);

  return (
    <Modal
      className={styles['edit-board']}
      closeModal={closeModal}
      modal={modal}
    >
      <Form className={styles['edit-board__form']} method="post">
        <Typography tag="h2" variant="heading-l">
          Edit Board
        </Typography>
        <input hidden name="formID" defaultValue="edit-board" />
        <input
          hidden
          name="boardID"
          defaultValue={existingBoard ? existingBoard._id : undefined}
        />
        <fieldset>
          <label className={typography['body-m']}>
            <Typography tag="p" variant="body-m">
              Board Name
            </Typography>
            <span className={`${auth['label-error']}`}>
              {boardError ? `${boardError}` : ''}
            </span>
          </label>
          <input
            name="board-name"
            placeholder="e.g. Web Design"
            type="text"
            defaultValue={existingBoard ? existingBoard.title : ''}
            required
          />
        </fieldset>
        <fieldset className={styles['board-columns']}>
          <label htmlFor="cancellable-input" className={typography['body-m']}>
            <Typography tag="p" variant="body-m">
              Board Columns
            </Typography>
            <span className={`${auth['label-error']}`}>
              {columnError ? `${columnError}` : ''}
            </span>
          </label>
          {localColumns?.map((el: any, index: number) => {
            return (
              <CancellableInput
                key={el.clientID}
                type="text"
                index={index}
                name={`column-${index}`}
                inputList={localColumns}
                setInputList={setLocalColumns}
                defaultValue={el.title}
                columnID={el.clientID}
                required
              />
            );
          })}
          <Button
            type="button"
            className={`${btn.btn} ${btn['btn__secondary']}`}
            onClick={() => addColumn()}
          >
            + Add New Column
          </Button>
        </fieldset>
        <Button type="submit" className={`${btn.btn} ${btn['btn__primary']}`}>
          Save Changes
        </Button>
      </Form>
    </Modal>
  );
};

export default EditBoard;
