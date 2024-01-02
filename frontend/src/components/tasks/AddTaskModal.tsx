import { useEffect, useState } from 'react';
import { useActionData, useParams } from 'react-router';
import Modal from '../modal/Modal';
import { Form } from 'react-router-dom';
import Typography from '../../typography/Typography';
import CancellableInput from '../cancellable-input/CancellableInput';
import Button from '../button/Button';
import useAuthContext from '../../pages/Authentication/useAuthContext';
import { v4 as uuidv4 } from 'uuid';
import btn from './../button/Button.module.scss';
import taskModal from './TaskModal.module.scss';
interface Props {
  closeModal: () => void;
  modal: Boolean;
}

const AddTaskModal = ({ closeModal, modal }: Props) => {
  const [subtasks, setSubtasks] = useState<Array<any>>([]);
  const actionData = useActionData();
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

  const addSubtask = () => {
    setSubtasks((state: any) => [...state, { name: '', clientID: uuidv4() }]);
  };

  useEffect(() => {
    if (actionData && actionData instanceof Object) {
      closeModal();
    }
  }, [actionData]);

  return (
    <Modal
      className={taskModal['add-task']}
      closeModal={closeModal}
      modal={modal}
    >
      <Form className="" method="post">
        <Typography tag="h2" variant="heading-l">
          Add New Task
        </Typography>
        <input hidden name="formID" defaultValue="add-task" />
        <input
          hidden
          name="boardID"
          defaultValue={existingBoard ? existingBoard._id : undefined}
        />
        <fieldset>
          <label>
            <Typography variant="body-m" tag="p">
              Title
            </Typography>
          </label>
          <input
            name="task-title"
            placeholder="e.g. Take coffee break"
            type="text"
            required
          />
        </fieldset>
        <fieldset>
          <label>
            <Typography variant="body-m" tag="p">
              Description
            </Typography>
          </label>
          <textarea
            name="task-description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            required
          />
        </fieldset>
        <fieldset className={taskModal['subtasks']}>
          <label htmlFor="cancellable-input">
            <Typography variant="body-m" tag="p">
              Subtasks
            </Typography>
          </label>
          {subtasks.map((el, index) => {
            return (
              <CancellableInput
                key={el.clientID}
                type="text"
                index={index}
                name={`subtask-${index}`}
                inputList={subtasks}
                setInputList={setSubtasks}
                required
                columnID={el.clientID}
              />
            );
          })}
          <Button
            type="button"
            onClick={addSubtask}
            className={`${btn.btn} ${btn['btn__secondary']}`}
          >
            + Add New Subtasks
          </Button>
        </fieldset>
        <fieldset>
          <label>
            <Typography variant="body-m" tag="p">
              Status
            </Typography>
          </label>
          <select title="column-status" name="status">
            {existingBoard?.columns?.map((column: any, index: number) => {
              return (
                <option
                  key={`option-${index}`}
                  title={`option-${index}`}
                  value={column.title}
                >
                  {column.title}
                </option>
              );
            })}
          </select>
        </fieldset>
        <Button type="submit" className={`${btn.btn} ${btn['btn__primary']}`}>
          Create Task
        </Button>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
